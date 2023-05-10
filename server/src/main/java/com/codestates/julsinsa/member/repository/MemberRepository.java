package com.codestates.julsinsa.member.repository;

import com.codestates.julsinsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByRealNameAndPhone(String name, String phone);

    Optional<Member> findByRealNameAndPhoneAndEmail(String name,String phone,String email);
}
