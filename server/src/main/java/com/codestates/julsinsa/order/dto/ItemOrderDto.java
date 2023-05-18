package com.codestates.julsinsa.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ItemOrderDto {

    @Getter
    @AllArgsConstructor
    public static class Response {

        private long itemId;

        private String titleKor;
        private int quantity;
    }
}
