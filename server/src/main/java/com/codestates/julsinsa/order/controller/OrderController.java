package com.codestates.julsinsa.order.controller;

import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.order.dto.OrderPostDto;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.repository.OrderRepository;
import com.codestates.julsinsa.order.service.OrderService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.io.IOException;


@RestController
@Validated
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    private final ItemService itemService;

    public OrderController(OrderService orderService, OrderRepository orderRepository, ItemService itemService) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity confirmPayment(@RequestBody OrderPostDto orderPostDto) {
        Order order = orderService.createOrder();

        if(order.getOrderStatus() == Order.OrderStatus.ORDER_COMPLETE) {
            return new ResponseEntity<>(,HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@PathVariable("order-id") @Positive Long orderId) {
        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{paymentKey}/cancel")
    public ResponseEntity cancelOrder(@PathVariable String paymentKey,
                                      @RequestParam String cancelReason) throws IOException, InterruptedException {
    Order order = orderService.cancelOrder();

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
