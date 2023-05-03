package com.codestates.julsinsa.member.mapper;

import com.codestates.julsinsa.member.dto.MemberDto;
import com.codestates.julsinsa.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);
}
