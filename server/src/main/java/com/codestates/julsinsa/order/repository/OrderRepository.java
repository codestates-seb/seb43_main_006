package com.codestates.julsinsa.order.repository;


import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByMember(Member member);
}
