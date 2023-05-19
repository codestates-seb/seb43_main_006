package com.codestates.julsinsa.member.service;

import com.codestates.julsinsa.auth.dto.LoginDto;
import com.codestates.julsinsa.auth.jwt.JwtTokenizer;
import com.codestates.julsinsa.auth.utills.CustomAuthorityUtils;
import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.helper.email.HtmlEmailSendable;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.helper.event.MemberRegistrationApplicationEvent;
import com.codestates.julsinsa.item.repository.FavoriteRepository;
import com.codestates.julsinsa.member.dto.EmailRequest;
import com.codestates.julsinsa.member.dto.FindDto;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;

    private Map<String,String> authMap = new HashMap<>();

    private final JavaMailSender javaMailSender;

    private final ApplicationEventPublisher publisher;
    private final FavoriteRepository favoriteRepository;

    private final JwtTokenizer jwtTokenizer;

    // 일반 회원 가입
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        if(!member.getMailKey().equals(authMap.get(member.getEmail()))){
            throw new BusinessLogicException(ExceptionCode.EMAIL_NOT_AUTHORIZED);
        }

        verifyAuthKey(authMap.get(member.getEmail()), member.getEmail());

        Member savedMember = memberRepository.save(member);

        // 여기서 this는 MemberService
        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, savedMember));
        return savedMember;

    }

    // oauth2로 회원가입 하는 로직
    public Member createOauth2Member(Member member) {
        member.setOauth2Registered(true);

        Member savedMember = memberRepository.save(member);
        return savedMember;
    }


    // oauth2 가입시 닉네임 설정시 권한 부여
    public Member updateOAuth2Member(Member member){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        List<String> roles = new ArrayList<>(authorityUtils.createRoles(findmember.getEmail()));
        findmember.setRoles(roles);
        findmember.setRealName(member.getRealName());
        findmember.setDisplayName(member.getDisplayName());
        findmember.setPhone(member.getPhone());
        findmember.setBirthDate(member.getBirthDate());

        return memberRepository.save(findmember);

    }

    // 회원 수정
    public Member updateMember(Member member){

        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        // 각각 설정
        Optional.ofNullable(member.getDisplayName()).ifPresent(displayName -> findmember.setDisplayName(displayName));
        Optional.ofNullable(member.getPhone()).ifPresent(phone -> findmember.setPhone(phone));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> findmember.setPassword(password));
        String encode = passwordEncoder.encode(findmember.getPassword());
        findmember.setPassword(encode);
        if(findmember.isPasswordIssued()){ // 임시비밀번호 발급자는 false로 설정
            findmember.setPasswordIssued(false);
        }

        return memberRepository.save(findmember);
    }

    // 회원 조회
    public Member findMember(){
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        return findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));
    }

    // 찜 목록 불러오기
    public List<ItemDto.favoriteItemResponse> findFavorites(){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        // 찜 목록 생성
        List<Object[]> resultList = favoriteRepository.findFavoriteItemsByMemberId(findmember.getMemberId());
        List<ItemDto.favoriteItemResponse> itemList = new ArrayList<>();
        for (Object[] objects : resultList) {
            ItemDto.favoriteItemResponse item = new ItemDto.favoriteItemResponse((Long)objects[0], (String) objects[1], (int) objects[2],(int) objects[3], (int) objects[4], (double) objects[5],(String) objects[6],(boolean) objects[7]);
            itemList.add(item);
        }

        return itemList;
    }

    // 이메일 전송 실패시 회원 삭제
    public void deleteMember(long memberId){
        Member member = findVerifiedMember(memberId);

        memberRepository.delete(member);
    }

    // 회원 탈퇴 아이디와 비밀번호가 일치해야함
    public void deleteMember(LoginDto member) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        if(!(findmember.getEmail().equals(member.getUsername()) && passwordEncoder.matches(member.getPassword(), findmember.getPassword()))){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }

        memberRepository.delete(findmember);
    }

    public Member findMemberEmail(FindDto.Id requestBody) {
        Optional<Member> optionalMember = memberRepository.findByRealNameAndPhone(requestBody.getName(), requestBody.getPhone());
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return member;
    }

    public Member findMemberPassword(FindDto.Password requestBody){
        Optional<Member> optionalMember = memberRepository.findByRealNameAndPhoneAndEmail(requestBody.getName(), requestBody.getPhone(), requestBody.getEmail());
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String tempPassword = getTempPassword();
        String encryptedPassword = passwordEncoder.encode(tempPassword);
        member.setPassword(encryptedPassword);
        member.setPasswordIssued(true);
        sendTempPassword(member,tempPassword);


        return memberRepository.save(member);
    }

    private void verifyExistsEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public  Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public boolean checkByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.isPresent();
    }

    public Member findByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 메일 인증 비동기로 구현
    @Async
    public void sendEmail(EmailRequest request) {

        verifyExistsEmail(request.getEmail());

        String authValue = authMap.get(request.getEmail());
        if(authValue != null){
            authMap.remove(request.getEmail());
        }

        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        authMap.put(request.getEmail(),authKey);

        String subject = "매주매주 회원가입 인증 이메일";
        String text = "<html><body style='background-color:#f9f9f9;'>"
                + "<div style='background-color:white; padding:20px;'>"
                + "<h2 style='color:#008080;'>회원 가입 인증 이메일</h2>"
                + "<p>회원 가입을 위한 인증번호는 <strong>" + authKey + "</strong> 입니다.</p>"
                + "<p style='font-size:12px; color:gray;'>본 이메일은 발신 전용입니다. 회신하실 경우 답변이 되돌아 갈 수 없습니다.</p>"
                + "</div></body></html>";

        HtmlEmailSendable htmlEmailSender = new HtmlEmailSendable(javaMailSender);
        try {
            htmlEmailSender.send(new String[]{request.getEmail()}, subject, text, null);
        } catch (InterruptedException e) {
            log.error("Failed to send HTML email.", e);
            throw new RuntimeException(e);
        }
    }

    @Async
    public void sendTempPassword(Member member, String tempPassword) {

        String subject = "매주매주 임시 비밀번호 발급";
        String text =  "<html><body>"
                + "<h2 style='color:#008080;'>안녕하세요 " + member.getDisplayName() + "님!</h2>"
                + "<p style='font-size: 14px; line-height: 24px;'>임시 비밀번호는 <span style='font-weight: bold;'>" + tempPassword + "</span> 입니다.</p>"
                + "<p style='font-size:12px; color:gray;'>본 이메일은 발신 전용입니다. 회신하실 경우 답변이 되돌아 갈 수 없습니다.</p>"
                + "</body></html>";

        HtmlEmailSendable htmlEmailSender = new HtmlEmailSendable(javaMailSender);
        try {
            htmlEmailSender.send(new String[]{member.getEmail()}, subject, text, null);
        } catch (InterruptedException e) {
            log.error("Failed to send HTML email.", e);
            throw new RuntimeException(e);
        }
    }

    public void authEmail(EmailRequest request) {
        if(!request.getMailKey().equals(authMap.get(request.getEmail()))){
            throw new BusinessLogicException(ExceptionCode.EMAIL_NOT_AUTHORIZED);
        }
    }

    public boolean verifyAuthKey(String authKey, String email) {
        if (authMap.containsKey(email) && authMap.get(email).equals(authKey)) { // 저장된 인증키와 입력된 이메일이 일치하는지 검증
            authMap.remove(email); // 검증 완료 후 인증키를 맵에서 삭제
            return true;
        }
        return false;
    }

    // 임시비밀번호 발급 메서드
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void getToekn(HttpServletRequest request, HttpServletResponse response){

        try {
            String refreshJws = request.getHeader("Refresh");
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            Jws<Claims> claims = jwtTokenizer.getClaims(refreshJws, base64EncodedSecretKey); // refresh 토큰 검증
            // 리프레시 토큰 유효 -> 액세스 토큰 재발급.
            String email = claims.getBody().getSubject();
            Optional<Member> optionalMember = memberRepository.findByEmail(email);
            Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            String accessToken = jwtTokenizer.delegateAccessToken(member);
            String refreshToken = jwtTokenizer.delegateRefreshToken(member);
            Date expirationDateTime = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
            LocalDateTime issuedDateTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd/HH:mm:ss");
            String formattedExpirationDateTime = new SimpleDateFormat("yyyy-MM-dd/HH:mm:ss").format(expirationDateTime);

            new Date();
            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);
            response.setHeader("X-Member-ID", String.valueOf(member.getMemberId()));
            response.setHeader("exp", formattedExpirationDateTime);
            response.setHeader("iat", issuedDateTime.format(formatter));
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (SignatureException se) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            request.setAttribute("exception", e);
        }
    }

}
