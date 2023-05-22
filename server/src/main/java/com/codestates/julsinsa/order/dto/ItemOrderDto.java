package com.codestates.julsinsa.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ItemOrderDto {

    @Getter
    public static class Post{
        @NotNull
        private long itemId;
        @NotNull
        private int quantity;
    }


    @Getter
    @AllArgsConstructor
    public static class Response {

        private long itemId;

        private String titleKor;
        private int quantity;
    }
}
