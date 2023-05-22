package com.codestates.julsinsa.order.dto;

import com.codestates.julsinsa.order.entity.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long orderId;
    private List<ItemOrderDto.Response> itemOrders;
    private Order.OrderStatus orderStatus;

    private String name;

    @JsonProperty(value="orderedAt")
    private LocalDateTime createdAt;

    private LocalDate pickupDate;
}
