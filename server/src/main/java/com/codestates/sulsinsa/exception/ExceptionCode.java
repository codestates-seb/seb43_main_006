package com.codestates.sulsinsa.exception;

import lombok.Getter;

public enum ExceptionCode {

    MARKET_NOT_FOUND(404, "Market Not Found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
