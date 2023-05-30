package com.codestates.julsinsa.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

public class ItemCartDto {

    @Getter
    public static class Post{
        @Positive
        private long itemId;

        @Positive
        private int quantity;
    }

    @Getter
    public static class Patch{
        @Positive
        private long itemId;

        @Positive
        private int quantity;
    }

    @Getter
    public static class Delete{

        @Positive
        private long itemId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {

        private long itemId;

        private int quantity;

        private String titleKor;

        private int price;

        private String profile;
    }
}
