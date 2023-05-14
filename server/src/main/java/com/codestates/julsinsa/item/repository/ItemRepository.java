package com.codestates.julsinsa.item.repository;

import ch.qos.logback.core.util.OptionHelper;
import com.codestates.julsinsa.item.entity.Item;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
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

    Optional<Item> findByTitle_Kor(String title_korName);

    @Query(value = "Select * from Item where itemId = :id", nativeQuery = true)
    Item detailItems(Long id);

    @Query(value = "select * from Item where title_Kor like %:title%",nativeQuery = true)
    List<Item> search(String title);


}
