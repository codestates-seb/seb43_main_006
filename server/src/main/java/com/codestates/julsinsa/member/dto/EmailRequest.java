package com.codestates.julsinsa.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class EmailRequest {


    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String mailKey;
}
