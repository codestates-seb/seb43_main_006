package com.codestates.julsinsa.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),

    MEMBER_EXISTS(409, "Member exists"),

    EMAIL_NOT_AUTHORIZED(401,"Email not authorized"),

    MEMBER_NOT_AUTHORIZED(401,"Member not authorized"),
    ITEM_EXISTS(409,"Item exists"),

    LIKE_NOT_TWICE(409,"Like Not twice"),

    LIKE_NOT_CANCEL(204,"Like Not cancel"),

    MARKET_NOT_FOUND(404, "Market Not Found"),

    ORDER_NOT_FOUND(404, "Order Not Found"),

    PAYMENT_REQUEST_FAIL(404, "Payment Request Fail"),

    CART_NOT_FOUND(404, "Cart Not Found"),
    // 수정 할 것
    IMAGE_NOT_CONVERTED(404,"이미지 변환에 실패했습니다."),
    IMAGE_NOT_UPLOADED(404, "파일을 업로드 하던 중 에러가 발생했습니다"),

    REVIEW_NOT_FOUND(404,"Review not found"),

    DO_NOT_MATCH(406,"Do not match"),
    ITEM_NOT_FOUND(404,"Item not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
