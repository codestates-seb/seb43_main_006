package com.codestates.julsinsa.item.repository;

import com.codestates.julsinsa.item.entity.Item;
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


}
