package com.codestates.julsinsa.auth.handler;


import com.codestates.julsinsa.auth.jwt.JwtTokenizer;
import com.codestates.julsinsa.auth.utills.CustomAuthorityUtils;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String clientRegistrationId = oauthToken.getAuthorizedClientRegistrationId(); // 어디서 정보 가져왔는지 확인 google,naver,kakao

        String email;
        if(clientRegistrationId.equals("naver")){ // 네이버 로그인시 , 이메일 가져오는 곳이 다르므로
            Map<String, Object> naverAccount = (Map<String, Object>) attributes.get("response");
            email = (String) naverAccount.get("email");
        } else if(clientRegistrationId.equals("kakao")){ // 카카오 로그인시 , 이메일 가져오는 곳이 다르므로
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            email = (String) kakaoAccount.get("email");
        }else{
            email = String.valueOf(oAuth2User.getAttributes().get("email"));
        }

        Member member;

        if(!memberService.checkByEmail(email)) { // 디비에 있으면 회원가입x
            member = saveMember(email);// (5)
        }else{ // 디비에 있으면 이메일 체크
            member = memberService.findByEmail(email);
        }

        if(member.getDisplayName() == null){ // 닉네임 설정 안되어 있으면 약관페이지로 리다이렉트
            List<String> authorities = List.of("ANONYMOUS"); // 익명의 권한 부여
            redirectSignup(request, response, email, authorities);
        }else{
            List<String> authorities = authorityUtils.createRoles(email);
            redirect(request, response, email, authorities);
        }

    }

    private Member saveMember(String email) {
        Member member = new Member(email);
        member.setCart(new Cart());
        return memberService.createOauth2Member(member);
    }

    private void redirectSignup(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);
        Member member = memberService.findByEmail(username);

        String addedAccessToken = "Bearer " + accessToken;

        response.setHeader("Authorization", addedAccessToken);
        response.setHeader("Refresh", refreshToken);


        String uri = createSignupURI(addedAccessToken, refreshToken,member).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);
        Member member = memberService.findByEmail(username);
        String addedAccessToken = "Bearer " + accessToken;

        response.setHeader("Authorization", addedAccessToken);
        response.setHeader("Refresh", refreshToken);

        String uri = createURI(addedAccessToken, refreshToken,member).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    //회원가입시 실행
    private URI createSignupURI(String accessToken, String refreshToken,Member member) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        LocalDateTime expirationDateTime = now.plusMinutes(jwtTokenizer.getAccessTokenExpirationMinutes()).plusHours(0);
        LocalDateTime issuedDateTime = now.plusHours(0);

        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("exp", expirationDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd/HH:mm:ss")));
        queryParams.add("iat", issuedDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd/HH:mm:ss")));
        queryParams.add("X-Member-ID", String.valueOf(member.getMemberId()));

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("codestates-main-mejumeju.s3-website.ap-northeast-2.amazonaws.com")
//                .port(8080)
                .path("/signup/term")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
    // 로그인
    private URI createURI(String accessToken, String refreshToken,Member member) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        LocalDateTime expirationDateTime = now.plusMinutes(jwtTokenizer.getAccessTokenExpirationMinutes()).plusHours(0);
        LocalDateTime issuedDateTime = now.plusHours(0);
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("exp", expirationDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd/HH:mm:ss")));
        queryParams.add("iat", issuedDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd/HH:mm:ss")));
        queryParams.add("X-Member-ID", String.valueOf(member.getMemberId()));

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("codestates-main-mejumeju.s3-website.ap-northeast-2.amazonaws.com")
//                .port(3000)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}