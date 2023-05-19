package com.codestates.julsinsa.cart.controller;

import com.codestates.julsinsa.cart.dto.CartDto;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.cart.mapper.CartMapper;
import com.codestates.julsinsa.cart.service.CartService;
import com.codestates.julsinsa.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/cart")
@RestController
@RequiredArgsConstructor
@Validated
public class CartController {

    private final CartService cartService;
    private final CartMapper mapper;

    @PostMapping
    public ResponseEntity postCart(@Valid @RequestBody CartDto.Post requestBody){
        Cart createCart = cartService.createCart(requestBody);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteCart(@RequestBody CartDto.Delete requestBody){
        Cart cart = cartService.deleteCart(requestBody);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.cartToCartResponse(cart)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCart() {
        Cart cart = cartService.findCart();

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.cartToCartResponse(cart)), HttpStatus.OK);
    }
}
