package com.codestates.julsinsa.cart.service;

import com.codestates.julsinsa.cart.dto.CartDto;
import com.codestates.julsinsa.cart.dto.ItemCartDto;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.cart.entity.ItemCart;
import com.codestates.julsinsa.cart.repository.CartRepository;
import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    private final ItemService itemService;
    public Cart createCart(CartDto.Post requestBody){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        int totalQuantity = member.getCart().getTotalQuantity();
        int totalPrice = member.getCart().getTotalPrice();


        Item item = itemService.findVerifedItem(requestBody.getItemId()); // 아이템 조회
        int quantity = requestBody.getQuantity(); // 수량

        // 장바구니에 중복된 아이템이 있는지 확인
        Optional<ItemCart> existingItemCart = member.getCart().getItemCarts()
                .stream()
                .filter(ic -> ic.getItem().getItemId() == requestBody.getItemId())
                .findFirst();

        if (existingItemCart.isPresent()) {
            // 이미 장바구니에 있는 아이템이면 수량만 증가
            ItemCart cartItem = existingItemCart.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
                // 장바구니에 없는 아이템이면 새로 추가
            ItemCart itemCart = new ItemCart();
            itemCart.setItem(item);
            itemCart.setQuantity(quantity);
            itemCart.setCart(member.getCart());

            member.getCart().getItemCarts().add(itemCart);
        }

        totalQuantity += quantity;
        totalPrice += item.getPrice() * quantity;
        member.getCart().setTotalQuantity(totalQuantity);
        member.getCart().setTotalPrice(totalPrice);
        // 장바구니 저장
        return cartRepository.save(member.getCart());
    }

    public Cart deleteCart(CartDto.Delete requestBody){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        List<Long> itemIdsToDelete = requestBody.getItemIds(); // 삭제할 아이템 ID 목록
//
////        member.getCart().getItemCarts().removeIf(itemCart -> itemIdsToDelete.contains(itemCart.getItem().getItemId()));

        List<ItemCart> itemCartsToDelete = member.getCart().getItemCarts().stream()
                .filter(itemCart -> itemIdsToDelete.contains(itemCart.getItem().getItemId()))
                .collect(Collectors.toList());

        member.getCart().getItemCarts().removeAll(itemCartsToDelete);
        itemCartsToDelete.forEach(itemCart -> itemCart.setCart(null)); // 양방향 관계 업데이트

        // 장바구니 저장
        return cartRepository.save(member.getCart());

    }

    public Cart updateCartItemQuantity(CartDto.Patch requestBody) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        for (ItemCartDto.Patch itemPatch : requestBody.getCart()) {
            long itemId = itemPatch.getItemId();
            int quantity = itemPatch.getQuantity();

            Item item = itemService.findVerifedItem(itemId); // 아이템 조회

            // 장바구니에서 해당 아이템을 찾아서 개수 수정
            Optional<ItemCart> existingItemCart = member.getCart().getItemCarts()
                    .stream()
                    .filter(ic -> ic.getItem().getItemId().equals(itemId))
                    .findFirst();

            if (existingItemCart.isPresent()) {
                ItemCart cartItem = existingItemCart.get();
                cartItem.setQuantity(quantity);
            } else {
                throw new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND);
            }
        }

        // 장바구니 저장
        return cartRepository.save(member.getCart());
    }

    public Cart findCart(){
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));


        Optional<Cart> optionalCart = cartRepository.findById(findmember.getCart().getCartId());
        return optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }



}
