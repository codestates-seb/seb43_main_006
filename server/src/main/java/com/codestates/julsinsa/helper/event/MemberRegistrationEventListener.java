package com.codestates.julsinsa.helper.event;

import com.codestates.julsinsa.helper.email.EmailSender;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@EnableAsync
@Configuration
@Component
@Slf4j
@RequiredArgsConstructor
public class MemberRegistrationEventListener {

    @Value("${mail.subject.member.registration}")
    private String subject;

    @Value("${mail.template.name.member.join}")
    private String templateName;

    private final EmailSender emailSender;
    private final MemberService memberService;

    @Async
    @EventListener
    public void listen(MemberRegistrationApplicationEvent event) throws Exception{
        try {
            String[] to = new String[]{event.getMember().getEmail()};
            String message = event.getMember().getDisplayName() + "님, 회원 가입이 성공적으로 완료되었습니다.";
            emailSender.sendEmail(to,subject,message,templateName);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException: rollback for Member Registration:");
            Member member = event.getMember();
            memberService.deleteMember(member.getMemberId());
        }
    }

}
