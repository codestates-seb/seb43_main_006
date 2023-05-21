package com.codestates.julsinsa.order.service;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    public Order createOrder(Order order) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        order.setOrderStatus(Order.OrderStatus.ORDER_COMPLETE);
        order.setMember(member);

        return orderRepository.save(order);
    }

    public Order getOrder(Long orderId) {
        return findVerifiedOrder(orderId);
    }

    public List<Order> getOrders() {

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        List<Order> orders = orderRepository.findAllByMember(member);


        return orders;
    }

    public void cancelOrder(Long orderId){
        Order order = findVerifiedOrder(orderId);
        order.setOrderStatus(Order.OrderStatus.ORDER_CANCEL);
        orderRepository.save(order);
    }

    private Order findVerifiedOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return order;
    }
}
