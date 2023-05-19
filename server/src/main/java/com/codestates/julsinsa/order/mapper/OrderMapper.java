package com.codestates.julsinsa.order.mapper;

import com.codestates.julsinsa.order.dto.OrderPostDto;
import com.codestates.julsinsa.order.dto.OrderResponseDto;
import com.codestates.julsinsa.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    Order orderPostDtoToOrder(OrderPostDto orderPostDto);
    OrderResponseDto orderToOrderResponseDto(Order order);
}
