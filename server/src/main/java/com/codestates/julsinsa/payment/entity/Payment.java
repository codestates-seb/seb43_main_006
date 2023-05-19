package com.codestates.julsinsa.payment.entity;

import com.codestates.julsinsa.order.entity.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String paymentKey;
    private String orderId; // 토스 페이먼츠 Id
    private BigDecimal amount;

    @OneToOne
    @JoinColumn(name = "orders_id")
    private Order order;
}
