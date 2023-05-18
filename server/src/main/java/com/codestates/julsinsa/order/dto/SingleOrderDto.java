package com.codestates.julsinsa.order.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SingleOrderDto {

    private Long itemId;
    private String paymentKey;
    private String orderId;
    private Long amount;
}
