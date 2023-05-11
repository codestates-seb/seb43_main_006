package com.codestates.julsinsa.market.repository;

import com.codestates.julsinsa.market.entitiy.Market;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface MarketRepository extends JpaRepository<Market, Long> {

//    name과 address 필드를 모두 포함하는 Market 엔티티를 검색하는 메서드
    Page<Market> findByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(String name, String address, Pageable pageable);
//    name 필드를 포함하는 Market 엔티티를 검색하는 메서드
    Page<Market> findByNameContainingIgnoreCase(String name, Pageable pageable);
//    address 필드를 포함하는 Market 엔티티를 검색하는 메서드
    Page<Market> findByAddressContainingIgnoreCase(String address, Pageable pageable);

    @Override
    Page<Market> findAll(Pageable pageable);

}
