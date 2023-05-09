package com.codestates.julsinsa.review.dto;

import com.codestates.julsinsa.image.entity.ReviewImage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ReviewDto {

    @Getter
    public static class Post{

        private String title;

        private String content;

        private double rating;
    }

    @Getter
    public static class Patch{

        private Long reviewId;
        private String title;

        private String content;

        private double rating;

        public void setReviewId(Long reviewId) {
            this.reviewId = reviewId;
        }
    }

    @Getter
    @Setter
    public static class Response{
        private Long reviewId;
        private String title;

        private String content;

        private double rating;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;

        private List<String> reviewImages;

        public void setReviewImages(List<ReviewImage> reviewImages) {
            // ReviewImage 목록을 String 목록으로 변환하여 저장
            this.reviewImages = reviewImages.stream()
                    .map(reviewImage -> reviewImage.getImageInfo().getBaseUrl() + reviewImage.getImageInfo().getFilePath() + reviewImage.getImageInfo().getImageName())
                    .collect(Collectors.toList());
        }
    }
}
