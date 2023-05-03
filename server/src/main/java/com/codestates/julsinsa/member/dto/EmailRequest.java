package com.codestates.julsinsa.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;

@Getter
public class EmailRequest {

    @Email
    private String email;

    private String mailKey;
}
