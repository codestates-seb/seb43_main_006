package com.codestates.julsinsa.auth.filter;

import com.codestates.julsinsa.auth.jwt.JwtTokenizer;
import com.codestates.julsinsa.auth.utills.CustomAuthorityUtils;
import com.codestates.julsinsa.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;

    private final CustomAuthorityUtils authorityUtils;

    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String,Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) { // JWT토큰 만료 시간이 지났을 때 발생하는 예외
//            verifyRefreshJws(request, response);
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }


        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

//    // refresh 토큰을 통한 access토큰 재발급
//    private void verifyRefreshJws(HttpServletRequest request, HttpServletResponse response) {
//        String refreshJws = request.getHeader("Refresh");
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        try {
//            Jws<Claims> claims = jwtTokenizer.getClaims(refreshJws, base64EncodedSecretKey);// refresh 토큰 검증
//            //리프레시 토큰 유효 -> 액세스 토큰 재발급.
//            String email = claims.getBody().getSubject();
//            Optional<Member> optionalMember = memberRepository.findByEmail(email);
//            Member member = optionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//            String accessToken = jwtTokenizer.delegateAccessToken(member);
//            String refreshToken = jwtTokenizer.delegateRefreshToken(member);
//            response.setHeader("Authorization", "Bearer " + accessToken);
//            response.setHeader("Refresh", refreshToken);
//
//        } catch (SignatureException se) {
//            request.setAttribute("exception", se);
//        } catch (ExpiredJwtException ee) {
//            request.setAttribute("exception", ee);
//        } catch (Exception e) {
//            request.setAttribute("exception", e);
//        }
//    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}
