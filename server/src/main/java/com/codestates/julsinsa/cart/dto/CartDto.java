package com.codestates.julsinsa.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Positive;
import java.util.List;

public class CartDto {

    @Getter
    public static class Post{
        @Positive
        private long itemId;

        @Positive
        private int quantity;
    }

    @Getter
    public static class Delete{

        private List<Long> itemIds;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private Long cartId;

//        private int totalQuantity;
//
//        private int totalPrice;

        private List<ItemCartDto.Response> itemCarts;

    }
}
