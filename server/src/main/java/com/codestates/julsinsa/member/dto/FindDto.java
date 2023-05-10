package com.codestates.julsinsa.member.dto;

import lombok.Getter;
import lombok.Setter;

public class FindDto {


    @Getter
    public static class Id {

        private String name;
        private String phone;
    }

    @Getter
    public static class Password {

        private String name;

        private String phone;

        private String email;

    }

    @Getter
    @Setter
    public static class ResponseId {

        private String email;
    }
}
