package com.codestates.julsinsa.order.mapper;

import com.codestates.julsinsa.order.dto.CartOrderDto;
import com.codestates.julsinsa.order.dto.PaymentResponse;
import com.codestates.julsinsa.order.dto.SingleOrderDto;
import com.codestates.julsinsa.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    Order singleOrderDtoToOrder(SingleOrderDto singleOrderDto);
    Order cartOrderDtoToOrder(CartOrderDto cartOrderDto);
    PaymentResponse orderToPaymentResponse(Order order);
}
