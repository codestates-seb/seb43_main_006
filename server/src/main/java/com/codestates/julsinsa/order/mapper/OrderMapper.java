package com.codestates.julsinsa.order.mapper;

import com.codestates.julsinsa.order.dto.OrderPostDto;
import com.codestates.julsinsa.order.dto.OrderResponseDto;
import com.codestates.julsinsa.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
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


    Order orderPostDtoToOrder(OrderPostDto orderPostDto);
    @Mapping(source = "member.realName", target = "name")
    OrderResponseDto orderToOrderResponseDto(Order order);
    @Mapping(source = "member.realName", target = "name")
    OrderDto.Response orderToOrderResponse(Order order);

    ItemOrderDto itemOrderToItemOrderDto(ItemOrder itemOrder);

    @Mapping(source = "item.itemId", target = "itemId")
    @Mapping(source = "item.titleKor", target = "titleKor")
    ItemOrderDto.Response itemOrderToItemOrderResponse(ItemOrder itemOrder);


    List<OrderDto.Response> ordersToOrderResponses(List<Order> orders);

}
