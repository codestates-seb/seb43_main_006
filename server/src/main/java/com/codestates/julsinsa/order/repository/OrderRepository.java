package com.codestates.julsinsa.order.repository;


import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByMember(Member member);

    Optional<Order> findByMemberAndItemOrders_Item_ItemIdAndOrderStatus(Member member, long itemId, Order.OrderStatus orderStatus);
}
