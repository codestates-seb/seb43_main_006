package com.codestates.julsinsa.global.utils;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
@RequiredArgsConstructor
@Component
public class MemberUtils {

    //로그인한 사용자를 불러오기 위한 유틸
    private final MemberRepository memberRepository;

    public Member findLoggedInMember() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        return findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));
    }
}
