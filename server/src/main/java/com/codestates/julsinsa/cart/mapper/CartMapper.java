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

//    default Cart cartPostToCart(CartDto.Post requestBody) {
//        Cart cart = new Cart();
//        List<ItemCart> itemCarts = requestBody.getItemCarts().stream()
//                .map(itemCartDto -> {
//                    ItemCart itemCart = new ItemCart();
//                    Item item = new Item();
//                    item.setItemId(itemCartDto.getItemId());
//                    itemCart.setCart(cart);
//                    itemCart.setItem(item);
//                    itemCart.setQuantity(itemCartDto.getQuantity());
//                    return itemCart;
//                }).collect(Collectors.toList());
//        cart.setItemCarts(itemCarts);
//        return cart;
//    }
    Cart cartPostToCart(CartDto.Post requestBody);

    CartDto.Response cartToCartResponse(Cart cart);

    @Mapping(source = "item.itemId", target = "itemId")
    @Mapping(source = "item.titleKor",target = "titleKor")
    @Mapping(source = "item.price",target = "price")
    @Mapping(source = "item.profile",target = "profile")
    ItemCartDto.Response itemCartToItemCartResponse(ItemCart itemCart);
}
