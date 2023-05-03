package com.codestates.julsinsa.helper.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Slf4j
@RequiredArgsConstructor
public class SimpleEmailSendable implements EmailSendable{

    private final JavaMailSender javaMailSender;

    @Override
    public void send(String[] to, String subject, String message, String templateName) throws InterruptedException {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setText(message);
        mailMessage.setSubject(subject);
        javaMailSender.send(mailMessage);

        log.info("Sent simple email!");
    }
}
