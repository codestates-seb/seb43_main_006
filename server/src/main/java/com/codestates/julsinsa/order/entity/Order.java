package com.codestates.julsinsa.order.entity;

import com.codestates.julsinsa.audit.Auditable;
import com.codestates.julsinsa.market.entitiy.Market;
import com.codestates.julsinsa.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class Order extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private String name;
    private String phone;

    @Enumerated(value = EnumType.STRING)
    @Column
    private OrderStatus orderStatus = OrderStatus.ORDER_REQUEST;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<ItemOrder> itemOrder = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    @OneToOne
    @JoinColumn(name = "market_id")
    private Market market;


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


