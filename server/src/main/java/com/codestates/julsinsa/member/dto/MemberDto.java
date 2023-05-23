package com.codestates.julsinsa.member.dto;

import com.codestates.julsinsa.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

public class MemberDto {
    @Getter
    @AllArgsConstructor // 테스트용
    public static class Post {

        @NotBlank
        private String realName;

        @NotBlank
        private String displayName;

        @NotBlank
        @Email
        private String email;

        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{8,}$",
                message = "비밀번호는 문자와 숫자를 혼합하여 8자 이상 입력해주세요.")
        private String password;


        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phone;


        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate birthDate;

        @NotBlank
        private String mailKey;

    }

    @Getter
    public static class Oath2Post {

        @NotBlank
        private String realName;

        @NotBlank
        private String displayName;

        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phone;


        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate birthDate;

    }

    @Getter
    public static class Patch {
        private String displayName;


        private String phone;

        private String password;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String realName;

        private String displayName;
        private String email;
        private String phone;
        private Member.MemberStatus memberStatus;

        private LocalDate birthDate;

        private boolean passwordIssued;

        private boolean oauth2Registered;
    }

    @Getter
    public static class Delete {
        private String email;
        private String password;
    }
}
