package com.codestates.julsinsa.helper.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@RequiredArgsConstructor
public class HtmlEmailSendable implements EmailSendable {

    private final JavaMailSender javaMailSender;


    @Override
    public void send(String[] to, String subject, String message, String templateName) throws InterruptedException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true,"UTF-8");
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(message, true);
            javaMailSender.send(mimeMessage);
            log.info("Sent HTML email!");
        } catch (MessagingException e) {
            log.error("Failed to send HTML email.", e);
            throw new RuntimeException(e);
        }
    }
}