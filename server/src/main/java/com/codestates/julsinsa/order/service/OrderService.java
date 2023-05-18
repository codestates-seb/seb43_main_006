package com.codestates.julsinsa.order.service;

import com.codestates.julsinsa.exception.BusinessLogicException;
import com.codestates.julsinsa.exception.ExceptionCode;
import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.service.MemberService;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.entity.ItemOrder;
import com.codestates.julsinsa.order.repository.OrderRepository;
import lombok.Value;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.net.BindException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.List;
import java.util.Optional;



@Service
public class OrderService {
    private final MemberService memberService;
    private final OrderRepository orderRepository;
    private final ItemService itemService;

//    @Value("${toss.secret-key}")
    private String SECRET_KEY;


    public OrderService(MemberService memberService, OrderRepository orderRepository, ItemService itemService) {
        this.memberService = memberService;
        this.orderRepository = orderRepository;
        this.itemService = itemService;
    }


    public Order singleOrder(Order order) {
        // 해당 멤버가 존재하는지 조회
        Member member = memberService.findVerifiedMember(order.getMember().getMemberId());
        order.addMember(member);

        // 해당 상품이 존재하는지 조회
        List<ItemOrder> itemOrderList = order.getItemOrder();
        itemOrderList.stream().
                forEach(itemOrder -> {itemService.findVerifedItem(itemOrder.getItem().getItemId());});

        if(order.getItem().getPrice() == order.getAmount()) {
            order = paymentConfirm(order);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.ORDER_AMOUNT_NOT_MATCHED);
        }

        return orderRepository.save(order) ;
    }

    public Order cartOrder(Order order) {
        Member member = memberService.findVerifiedMember(order.getMember().getMemberId());
        order.addMember(member);

        // 해당 상품이 존재하는지 조회
        List<ItemOrder> itemOrderList = order.getItemOrders();
        itemOrderList.stream().
                forEach(itemOrder -> {itemService.findVerifedItem(itemOrder.getItem().getItemId());});

        if(order.getCart().getPrice() == order.getAmount()) {
            order = paymentConfirm(order);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.ORDER_AMOUNT_NOT_MATCHED);
        }

        return orderRepository.save(order) ;
    }


    public Order findOrder(Long orderId) {
        return findVerifiedOrder(orderId);
    }


//    public Page<Order> findOrders(Pageable pageable) {
//        Page<Order> orderPage = orderRepository.findAll(pageable);
//
//        return  orderPage;
//    }

    public void cancelOrder(Long ordersId, String cancelReason){
        Order order = findVerifiedOrder(ordersId);

        boolean response = paymentCancel(order.getPaymentKey(), cancelReason);

        if (response) {
            order.setOrderStatus(Order.OrderStatus.ORDER_CANCEL);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.ORDER_REQUEST_FAIL);
        }
    }

    private Order findVerifiedOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return order;
    }

    private Order paymentConfirm(Order order){
        try {
            String encodedAuth = Base64.getEncoder().encodeToString((SECRET_KEY + ":").getBytes());
            String requestBody = "{\"paymentKey\":\"" + order.getPaymentKey() + "\",\"amount\":" + order.getAmount() + ",\"orderId\":\"" + order.getOrderId() + "\"}";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
                    .header("Authorization", "Basic " + encodedAuth)
                    .header("Content-Type", "application/json")
                    .method("POST", HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                order.setOrderStatus(Order.OrderStatus.ORDER_COMPLETE);
                return order;
            } else {
                throw new BusinessLogicException(ExceptionCode.ORDER_REQUEST_FAIL);
            }
        } catch (IOException | InterruptedException e) {
            throw new BusinessLogicException(ExceptionCode.ORDER_REQUEST_FAIL);
        }
    }

    private boolean paymentCancel(String paymentKey,String cancelReason){
        try {
            String encodedAuth = Base64.getEncoder().encodeToString((SECRET_KEY + ":").getBytes());

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel"))
                    .header("Authorization", "Basic " + encodedAuth)
                    .header("Content-Type", "application/json")
                    .method("POST", HttpRequest.BodyPublishers.ofString("{\"결제 취소 사유\":\"" + cancelReason + "\"}"))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (IOException | InterruptedException e) {
            throw new BusinessLogicException(ExceptionCode.ORDER_REQUEST_FAIL);
        }
    }
}
