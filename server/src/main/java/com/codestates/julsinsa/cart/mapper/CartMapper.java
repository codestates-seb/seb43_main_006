package com.codestates.julsinsa.cart.mapper;

import com.codestates.julsinsa.cart.dto.CartDto;
import com.codestates.julsinsa.cart.dto.ItemCartDto;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.cart.entity.ItemCart;
import com.codestates.julsinsa.item.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartMapper {

    Cart cartPostToCart(CartDto.Post requestBody);

    CartDto.Response cartToCartResponse(Cart cart);

    @Mapping(source = "item.itemId", target = "itemId")
    @Mapping(source = "item.titleKor",target = "titleKor")
    @Mapping(source = "item.price",target = "price")
    @Mapping(source = "item.profile",target = "profile")
    ItemCartDto.Response itemCartToItemCartResponse(ItemCart itemCart);
}
