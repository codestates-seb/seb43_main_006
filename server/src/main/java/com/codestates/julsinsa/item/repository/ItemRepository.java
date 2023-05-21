package com.codestates.julsinsa.item.repository;

import com.codestates.julsinsa.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

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

    // 한글 술이름으로 검색
    Page<Item> findAllByTitleKorContaining(String titleKor, Pageable pageable);

    Optional<Item> findByTitleKor(String titleKor);

}
