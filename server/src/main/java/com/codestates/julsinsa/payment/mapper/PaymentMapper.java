package com.codestates.julsinsa.payment.mapper;

import com.codestates.julsinsa.payment.dto.PaymentRequestDto;
import com.codestates.julsinsa.payment.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {
    Payment paymentRequestDtoToPayment(PaymentRequestDto paymentRequestDto);
}
