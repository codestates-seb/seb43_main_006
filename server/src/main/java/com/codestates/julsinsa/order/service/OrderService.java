package com.codestates.julsinsa.order.service;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.global.utils.MemberUtils;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import com.codestates.julsinsa.order.dto.ItemOrderDto;
import com.codestates.julsinsa.order.dto.OrderDto;
import com.codestates.julsinsa.order.entity.ItemOrder;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final MemberUtils memberUtils;

    public Order createOrder(OrderDto.Post orderPostDto) {

        Member findmember = memberUtils.findLoggedInMember();

        Order order = new Order();
        order.setOrderStatus(Order.OrderStatus.ORDER_COMPLETE);
        order.setMember(findmember);
        order.setPickupDate(orderPostDto.getPickupDate());

        List<ItemOrder> itemOrders = new ArrayList<>();
        for (ItemOrderDto.Post itemOrderDto : orderPostDto.getItemOrders()) {
            ItemOrder itemOrder = new ItemOrder();
            itemOrder.setOrder(order);
            itemOrder.setQuantity(itemOrderDto.getQuantity());

            Optional<Item> findItem = itemRepository.findById(itemOrderDto.getItemId());
            Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
            itemOrder.setItem(item);

            int orderedQuantity = itemOrderDto.getQuantity();
            int currentQuantity = item.getQuantity();
            int updatedQuantity = currentQuantity - orderedQuantity;
            item.setQuantity(updatedQuantity);

            itemOrders.add(itemOrder);
        }
        order.setItemOrders(itemOrders);

        itemRepository.saveAll(itemOrders.stream().map(ItemOrder::getItem).collect(Collectors.toList()));

        return orderRepository.save(order);
    }

    public Order getOrder(Long orderId) {
        return findVerifiedOrder(orderId);
    }

    public List<Order> getOrders() {

        Member findmember = memberUtils.findLoggedInMember();

        List<Order> orders = orderRepository.findAllByMember(findmember);


        return orders;
    }

    public void cancelOrder(Long orderId){

        Order order = findVerifiedOrder(orderId);

        if (order.getOrderStatus() == Order.OrderStatus.ORDER_COMPLETE) {
            order.setOrderStatus(Order.OrderStatus.ORDER_CANCEL);

            List<ItemOrder> itemOrders = order.getItemOrders();

            for (ItemOrder itemOrder : itemOrders) {
                Item item = itemOrder.getItem();
                int orderedQuantity = itemOrder.getQuantity();
                int currentQuantity = item.getQuantity();
                int updatedQuantity = currentQuantity + orderedQuantity;
                item.setQuantity(updatedQuantity);
            }

        }
        else if (order.getOrderStatus() == Order.OrderStatus.ORDER_CANCEL) {
            throw new BusinessLogicException(ExceptionCode.ORDER_ALREADY_CANCEL);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.ORDER_CANCEL_FAIL);
        }

        orderRepository.save(order);
    }

    private Order findVerifiedOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return order;
    }
}
