package com.codestates.julsinsa.member.mapper;

import com.codestates.julsinsa.member.dto.FindDto;
import com.codestates.julsinsa.member.dto.MemberDto;
import com.codestates.julsinsa.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);

    Member oauth2MemberPostToMember(MemberDto.Oath2Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponse(Member member);

    FindDto.ResponseId memberToFindResponseId(Member member);
//    Member memberDeleteToMember(MemberDto.Delete requestBody);
}
