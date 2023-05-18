package com.codestates.julsinsa.order.controller;

import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.order.dto.CartOrderDto;
import com.codestates.julsinsa.order.dto.SingleOrderDto;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.mapper.OrderMapper;
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

    private final OrderMapper orderMapper;
    private final ItemService itemService;

    public OrderController(OrderService orderService, OrderRepository orderRepository, OrderMapper orderMapper, ItemService itemService) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity confirmSinglePayment(@RequestBody SingleOrderDto singleOrderDto) {
        Order order = orderService.singleOrder(orderMapper.singleOrderDtoToOrder(singleOrderDto));

        if(order.getOrderStatus() == Order.OrderStatus.ORDER_COMPLETE) {
            return new ResponseEntity<>(orderMapper.orderToPaymentResponse(order),HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity confirmCartPayment(@RequestBody CartOrderDto cartOrderDto) {
        Order order = orderService.cartOrder(orderMapper.cartOrderDtoToOrder(cartOrderDto));

        if(order.getOrderStatus() == Order.OrderStatus.ORDER_COMPLETE) {
            return new ResponseEntity<>(orderMapper.orderToPaymentResponse(order),HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{orders-id}")
    public ResponseEntity getOrder(@PathVariable("orders-id") @Positive Long orderId) {
        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{orders-id}/cancel")
    public ResponseEntity cancelOrder(@PathVariable("orders-id") @Positive Long ordersId,
                                      @RequestParam String cancelReason) throws IOException, InterruptedException {
    orderService.cancelOrder(ordersId, cancelReason);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
