package com.codestates.julsinsa.helper.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSender {
    private final EmailSendable emailSendable;

    public void sendEmail(String[] to,String subject,String message,String templateName) throws MailSendException,InterruptedException{
        emailSendable.send(to,subject,message,templateName);
    }
}