package com.codestates.julsinsa.member.controller;

import com.codestates.julsinsa.auth.dto.LoginDto;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.global.dto.SingleResponseDto;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.member.dto.EmailRequest;
import com.codestates.julsinsa.member.dto.FindDto;
import com.codestates.julsinsa.member.dto.MemberDto;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.mapper.MemberMapper;
import com.codestates.julsinsa.member.service.MemberService;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.order.mapper.OrderMapper;
import com.codestates.julsinsa.order.service.OrderService;
import com.codestates.julsinsa.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberMapper mapper;

    private final MemberService memberService;

    private final static String MEMBER_DEFAULT_URL = "/members";

    private final OrderService orderService;

    private final OrderMapper orderMapper;

    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid MemberDto.Post requestBody){
        Member member = mapper.memberPostToMember(requestBody);
        member.addCart(new Cart());
        Member createdmember = memberService.createMember(member);


        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdmember.getMemberId());

        return ResponseEntity.created(location).build();
    }


    @PostMapping("/oauth2-signup")
    public ResponseEntity postOAuth2User(@RequestBody @Valid MemberDto.Oath2Post requestBody){
        Member member = memberService.updateOAuth2Member(mapper.oauth2MemberPostToMember(requestBody));

//        memberService.oauthgetToekn(member,response);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());

        return ResponseEntity.created(location).build();

    }

    @GetMapping
    public ResponseEntity getUser(){

        Member member = memberService.findMember();

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponse(member)),HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity patchUser(@RequestBody @Valid MemberDto.Patch requestBody){
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@RequestBody @Valid LoginDto requestBody) {
        memberService.deleteMember(requestBody);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/favorite")
    public ResponseEntity getFavorite() {
        List<ItemDto.favoriteItemResponse> favorites = memberService.findFavorites();

        return new ResponseEntity<>(new SingleResponseDto<>(favorites),HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity getOrders() {
        List<Order> orders = orderService.getOrders();

        return new ResponseEntity<>(new SingleResponseDto<>(orderMapper.ordersToOrderResponses(orders)),HttpStatus.OK);
    }

    @PostMapping("/email")
    public ResponseEntity sendEmail(@RequestBody EmailRequest requestBody){
        memberService.sendEmail(requestBody);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email-auth")
    public ResponseEntity authEmail(@RequestBody EmailRequest requestBody){
        memberService.authEmail(requestBody);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/find-id")
    public ResponseEntity findId(@RequestBody FindDto.Id requestBody){
        Member member = memberService.findMemberEmail(requestBody);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToFindResponseId(member)),HttpStatus.OK);
    }

    @PostMapping("/find-password")
    public ResponseEntity findPassword(@RequestBody FindDto.Password requestBody){
        Member member = memberService.findMemberPassword(requestBody);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/token")
    public void getToken(HttpServletRequest request, HttpServletResponse response){
        memberService.getToekn(request,response);
    }
}
