package com.codestates.julsinsa.order.mapper;

import com.codestates.julsinsa.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import com.codestates.julsinsa.order.dto.ItemOrderDto;
import com.codestates.julsinsa.order.dto.OrderDto;
import com.codestates.julsinsa.order.entity.ItemOrder;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    @Mapping(source = "member.realName", target = "name")
    OrderDto.Response orderToOrderResponseDto(Order order);
    @Mapping(source = "member.realName", target = "name")
    OrderDto.Responses orderToOrderResponse(Order order);

    ItemOrderDto itemOrderToItemOrderDto(ItemOrder itemOrder);

    @Mapping(source = "item.itemId", target = "itemId")
    @Mapping(source = "item.titleKor", target = "titleKor")
    ItemOrderDto.Response itemOrderToItemOrderResponse(ItemOrder itemOrder);


    List<OrderDto.Responses> ordersToOrderResponses(List<Order> orders);

}
