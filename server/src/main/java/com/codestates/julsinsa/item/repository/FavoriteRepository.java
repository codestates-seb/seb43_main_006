package com.codestates.julsinsa.item.repository;

import com.codestates.julsinsa.item.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT i.itemId , i.titleKor, i.price, i.quantity ,i.capacity, i.reviewRating, i.profile,f.isChecked " +
            "FROM Favorite f JOIN Item i ON f.item.itemId = i.itemId " +
            "WHERE f.member.memberId = :memberId")
    List<Object[]> findFavoriteItemsByMemberId(Long memberId);
}
