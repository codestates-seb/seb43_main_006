package com.codestates.julsinsa.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),

    MEMBER_EXISTS(409, "Member exists"),

    EMAIL_NOT_AUTHORIZED(401,"Email not authorized");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
