package com.codestates.julsinsa.order.service;

import com.codestates.julsinsa.exception.BusinessLogicException;
import com.codestates.julsinsa.exception.ExceptionCode;
import com.codestates.julsinsa.order.dto.OrderResponseDto;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setOrderStatus(Order.OrderStatus.ORDER_COMPLETE);
        return orderRepository.save(order);
    }

    public Order getOrder(Long orderId) {
        return findVerifiedOrder(orderId);
    }

    public List<OrderResponseDto> getOrders() {
        List<Order> orders = orderRepository.findAll();

        List<OrderResponseDto> responseDtoList = orders.stream()
                .map(order -> {
                    Order verifiedOrder = findVerifiedOrder(order.getOrderId());
                    OrderResponseDto responseDto = new OrderResponseDto();
                    responseDto.setOrderList(verifiedOrder.getItemOrders());
                    responseDto.setOrderStatus(verifiedOrder.getOrderStatus());
                    responseDto.setCreatedAt(verifiedOrder.getCreatedAt());
                    return responseDto;
                }).collect(Collectors.toList());

        return responseDtoList;
    }

    public void cancelOrder(Long orderId){
        Order order = findVerifiedOrder(orderId);

        order.setOrderStatus(Order.OrderStatus.ORDER_CANCEL);
    }

    private Order findVerifiedOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return order;
    }
}
