package com.codestates.julsinsa.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PaymentResponse {
    public String paymentKey;
    public String orderId;
}
