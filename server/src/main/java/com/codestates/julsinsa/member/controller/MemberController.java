package com.codestates.julsinsa.member.controller;

import com.codestates.julsinsa.auth.dto.LoginDto;
import com.codestates.julsinsa.dto.SingleResponseDto;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.member.dto.EmailRequest;
import com.codestates.julsinsa.member.dto.FindDto;
import com.codestates.julsinsa.member.dto.MemberDto;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.mapper.MemberMapper;
import com.codestates.julsinsa.member.service.MemberService;
import com.codestates.julsinsa.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    private final static String USER_DEFAULT_URL = "/users";

    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid MemberDto.Post requestBody){
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));

        URI location = UriCreator.createUri(USER_DEFAULT_URL, member.getMemberId());

        return ResponseEntity.created(location).build();
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
}
