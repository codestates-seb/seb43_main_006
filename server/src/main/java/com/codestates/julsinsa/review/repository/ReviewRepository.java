package com.codestates.julsinsa.review.repository;

import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.review.dto.ReviewDto;
import com.codestates.julsinsa.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> findAllByItem(Item item, Pageable pageable);
}
