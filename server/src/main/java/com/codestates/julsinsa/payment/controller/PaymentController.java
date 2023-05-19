package com.codestates.julsinsa.payment.controller;

import com.codestates.julsinsa.payment.dto.PaymentRequestDto;
import com.codestates.julsinsa.payment.mapper.PaymentMapper;
import com.codestates.julsinsa.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentMapper mapper;

    @PostMapping
    public ResponseEntity confirmPayment(@RequestBody PaymentRequestDto paymentRequestDto) {

        paymentService.paymentConfirm(mapper.paymentRequestDtoToPayment(paymentRequestDto));

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @DeleteMapping("/{payment-id}")
//    public ResponseEntity cancelPayment(@PathVariable("paymentKey") String paymentKey,
//                                        @RequestParam String cancelReason) {
//
//        paymentService.paymentCancel(paymentKey, cancelReason);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
