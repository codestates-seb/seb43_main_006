package com.codestates.julsinsa.member.service;

import com.codestates.julsinsa.auth.utills.CustomAuthorityUtils;
import com.codestates.julsinsa.exception.BusinessLogicException;
import com.codestates.julsinsa.exception.ExceptionCode;
import com.codestates.julsinsa.helper.event.MemberRegistrationApplicationEvent;
import com.codestates.julsinsa.member.dto.EmailRequest;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());



        if(member.getDisplayName() == null) member.setDisplayName(member.getEmail());

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        if(member.getPassword() != null) {
            String encryptedPassword = passwordEncoder.encode(member.getPassword());
            member.setPassword(encryptedPassword);

            if(!member.getMailKey().equals(authMap.get(member.getEmail()))){
                throw new BusinessLogicException(ExceptionCode.EMAIL_NOT_AUTHORIZED);
            }

            verifyAuthKey(authMap.get(member.getEmail()), member.getEmail());
        }




        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, savedMember));
        return savedMember;

    }

    public void deleteMember(long memberId) {

        Member member = findVerifiedMember(memberId);

        memberRepository.delete(member);
    }

    private void verifyExistsEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    private Member findVerifiedMember(long memberId) {
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

    @Async
    public void sendEmail(EmailRequest request) {

        String authValue = authMap.get(request.getEmail());
        if(authValue != null){
            authMap.remove(request.getEmail());
        }

        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        authMap.put(request.getEmail(),authKey);

        String subject = "매주매주 회원가입 인증 이메일";
        String text = "회원 가입을 위한 인증번호는 " + authKey + "입니다.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());
        message.setSubject(subject);
        message.setText(text);

        javaMailSender.send(message);
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

}
