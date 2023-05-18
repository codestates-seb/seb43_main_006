package com.codestates.julsinsa.item.repository;

import com.codestates.julsinsa.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item,Long> {

    @Modifying
    @Query(value = "INSERT INTO favorite (item_id, member_id) " +
            "SELECT :itemId, :memberId from dual " +
            "WHERE NOT EXISTS (SELECT item_id, member_id " +
                                "FROM favorite " +
                                "WHERE item_id = :itemId and member_id = :memberId)", nativeQuery = true)
    int upFavorite(long itemId,long memberId);

    @Modifying
    @Query(value = "DELETE FROM favorite WHERE item_id = :itemId and member_id = :memberId", nativeQuery = true)
    int downFavorite(long itemId,long memberId);

    // 카테고리 지정해서 페이지네이션
    Page<Item> findAllByCategories(String category, Pageable pageable);

    Page<Item> findAllByTitleKorContaining(String titleKor, Pageable pageable);

//    // 판매량에 따라 아이템 정렬
//    // 카테고리와 판매량에 따라 아이템 필터링 및 정렬
//    Page<Item> findAllByCategoriesAndSortBySales(String category, Pageable pageable);
//
//    // 카테고리와 할인율에 따라 아이템 필터링 및 정렬
//    Page<Item> findAllByCategoriesAndSortByDiscountRate(String category, Pageable pageable);
//
//    // 카테고리와 가격 오름차순으로 아이템 필터링
//    Page<Item> findAllByCategoriesAndSortByPriceAsc(String category, Pageable pageable);
//
//    // 카테고리와 가격 내림차순으로 아이템 필터링
//    Page<Item> findAllByCategoriesAndSortByPriceDesc(String category, Pageable pageable);
}
