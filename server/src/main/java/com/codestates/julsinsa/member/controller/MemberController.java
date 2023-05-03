package com.codestates.julsinsa.member.controller;

import com.codestates.julsinsa.member.dto.EmailRequest;
import com.codestates.julsinsa.member.dto.MemberDto;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.mapper.MemberMapper;
import com.codestates.julsinsa.member.service.MemberService;
import com.codestates.julsinsa.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

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

    @PostMapping("/email")
    public ResponseEntity sendEmail(@RequestBody EmailRequest request){
        memberService.sendEmail(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email-auth")
    public ResponseEntity authEmail(@RequestBody EmailRequest request){
        memberService.authEmail(request);
        return ResponseEntity.ok().build();
    }
}
