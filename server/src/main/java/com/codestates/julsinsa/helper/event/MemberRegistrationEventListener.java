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
            String message = "<html><body>"
                    + "<div style=\"background-color:#f5f5f5;padding:20px\">"
                    + "<h2 style=\"color:#007bff;margin-bottom:20px\">매주매주 회원 가입이 완료되었습니다.</h2>"
                    + "<p style=\"font-size:16px;margin-bottom:20px\">안녕하세요, " + event.getMember().getDisplayName() + "님!</p>"
                    + "<p style=\"font-size:16px;margin-bottom:20px\">매주매주의 회원이 되신 것을 축하드립니다.</p>"
                    + "<p style=\"font-size:16px;margin-bottom:20px\">감사합니다.</p>"
                    + "<p style='font-size:12px; color:gray;'>본 이메일은 발신 전용입니다. 회신하실 경우 답변이 되돌아 갈 수 없습니다.</p>"
                    + "</div>"
                    + "</body></html>";
            emailSender.sendEmail(to,subject,message,templateName);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException: rollback for Member Registration:");
            Member member = event.getMember();
            memberService.deleteMember(member.getMemberId());
        }
    }

}
