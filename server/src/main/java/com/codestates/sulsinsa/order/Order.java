package com.codestates.sulsinsa.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long orderId;
    private String name;
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column
    private OrderStatus orderStatus = OrderStatus.ORDER_REQUEST;

    @CreatedDate
    @Column(name = "created_At", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "modified_At")
    private LocalDateTime modifiedAt;


//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;


    public enum OrderStatus {
        ORDER_REQUEST("주문 요청"),
        ORDER_CONFIRM("주문 승인"),
        ORDER_COMPLETE("주문 완료"),
        ORDER_CANCEL("주문 취소");

        @Getter
        private String orderDec;

        OrderStatus(String orderDec) {
            this.orderDec = orderDec;
        }
    }

}


