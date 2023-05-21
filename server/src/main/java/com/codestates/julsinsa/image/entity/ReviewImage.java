package com.codestates.julsinsa.image.entity;

import com.codestates.julsinsa.global.audit.Auditable;
import com.codestates.julsinsa.review.entity.Review;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class ReviewImage extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_IMAGE_ID")
    private Long id;

    @Embedded
    private ImageInfo imageInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REVIEW_ID")
    private Review review;


}
