package com.codestates.julsinsa.order.mapper;

import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.order.dto.ItemOrderDto;
import com.codestates.julsinsa.order.dto.OrderDto;
import com.codestates.julsinsa.order.entity.ItemOrder;
import com.codestates.julsinsa.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    OrderDto.Response orderToOrderResponse(Order order);

    @Mapping(source = "item.itemId", target = "itemId")
    @Mapping(source = "item.titleKor", target = "titleKor")
    ItemOrderDto.Response itemOrderToItemOrderResponse(ItemOrder itemOrder);

    List<OrderDto.Response> ordersToOrderResponses(List<Order> orders);




//    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);
//
//    @Mapping(target = "itemList", ignore = true)
//    @Mapping(target = "totalPrice", ignore = true)
//    OrderDto.Response orderToOrderResponse(Order order);
//
//    default OrderDto.Response orderToOrderResponseWithItems(Order order) {
//        OrderDto.Response response = orderToOrderResponse(order);
//
//        // 아이템 주문 목록과 각 아이템의 금액 가져오기
//        List<ItemOrder> itemOrders = order.getItemOrder();
//        List<Item> items = new ArrayList<>();
//        int totalPrice = 0;
//
//        for (ItemOrder itemOrder : itemOrders) {
//            Item item = itemOrder.getItem();
//            int quantity = itemOrder.getQuantity();
//            int price = item.getPrice();
//
//            item.setQuantity(quantity);
//            item.setPrice(price);
//            items.add(item);
//            totalPrice += quantity * price;
//        }
//
//        response.setItemList(items);
//        response.setTotalPrice(totalPrice);
//
//        return response;
//    }
//
//    @Mapping(target = "itemList", ignore = true)
//    @Mapping(target = "totalPrice", ignore = true)
//    List<OrderDto.Response> ordersToOrderResponses(List<Order> orders);
}
