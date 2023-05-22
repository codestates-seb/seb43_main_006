package com.codestates.julsinsa.order.service;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.global.utils.MemberUtils;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import com.codestates.julsinsa.order.dto.ItemOrderDto;
import com.codestates.julsinsa.order.dto.OrderPostDto;
import com.codestates.julsinsa.order.entity.ItemOrder;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;

    private final MemberUtils memberUtils;

    public Order createOrder(OrderPostDto orderPostDto) {
        //로그인한 멤버 불러오기
        Member member = memberUtils.findLoggedInMember();

        Order order = new Order();
        order.setOrderStatus(Order.OrderStatus.ORDER_COMPLETE);
        order.setMember(member);
        order.setPickupDate(orderPostDto.getPickupDate());

        List<ItemOrder> itemOrders = new ArrayList<>();
        for (ItemOrderDto.Post itemOrderDto : orderPostDto.getItemOrders()) {
            ItemOrder itemOrder = new ItemOrder();
            itemOrder.setOrder(order);
            itemOrder.setQuantity(itemOrderDto.getQuantity());

            Optional<Item> findItem = itemRepository.findById(itemOrderDto.getItemId());
            Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
            itemOrder.setItem(item);

            itemOrders.add(itemOrder);
        }
        order.setItemOrders(itemOrders);

        return orderRepository.save(order);
    }

    public Order getOrder(Long orderId) {
        return findVerifiedOrder(orderId);
    }

    public List<Order> getOrders() {
        //로그인한 멤버 불러오기
        Member member = memberUtils.findLoggedInMember();

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
