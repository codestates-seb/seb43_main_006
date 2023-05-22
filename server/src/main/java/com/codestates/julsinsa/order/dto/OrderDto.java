package com.codestates.julsinsa.order.dto;


import com.codestates.julsinsa.order.entity.Order;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public class OrderDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotEmpty
        private List<ItemOrderDto.Post> itemOrders;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate pickupDate;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long orderId;
        private List<ItemOrderDto.Response> itemOrders;
        private Order.OrderStatus orderStatus;
        private String name;
        @JsonProperty(value="orderedAt")
        private LocalDateTime createdAt;
        private LocalDate pickupDate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Responses{

        private Long orderId;
        private String name;
        private Order.OrderStatus orderStatus;
        private int totalQuantity;
        private List<ItemOrderDto.Response> itemOrders;
        private LocalDate pickupDate;
        @JsonProperty(value="orderedAt")
        private LocalDate createdAt;

        // 아이템리스트에서 갯수들을 가져와서 더함
        public int getTotalQuantity() {
            int totalQuantity = 0;
            for (ItemOrderDto.Response itemOrder : itemOrders) {
                totalQuantity += itemOrder.getQuantity();
            }
            return totalQuantity;
        }
    }
}
