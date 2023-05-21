package com.codestates.julsinsa.review.controller;

import com.codestates.julsinsa.global.dto.SingleResponseDto;
import com.codestates.julsinsa.review.dto.ReviewDto;
import com.codestates.julsinsa.review.entity.Review;
import com.codestates.julsinsa.review.mapper.ReviewMapper;
import com.codestates.julsinsa.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @PostMapping("/{item-id}/reviews")
    public ResponseEntity postReview(@PathVariable("item-id") @Positive long itemId,
                                     @RequestPart(value = "requestBody") @Valid ReviewDto.Post requestBody,
                                     @RequestPart(value = "file",required = false) MultipartFile[] files) {

        Review review = reviewService.createReview(reviewMapper.reviewPostToReview(requestBody), itemId , files);


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity getReview(@PathVariable("item-id") @Positive long itemId,
                                    @PathVariable("review-id") @Positive long reviewId){
        Review review = reviewService.findReview(itemId, reviewId);

        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewToReviewResponse(review)),HttpStatus.OK);
    }

    @GetMapping("/{item-id}/reviews")
    public ResponseEntity getReviews(@PathVariable("item-id") @Positive long itemId){
        List<Review> reviews = reviewService.findReviews(itemId);


        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewsToReviewResponses(reviews)),HttpStatus.OK);
    }

    @PatchMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity patchReview(@PathVariable("item-id") @Positive long itemId,
                                      @PathVariable("review-id") @Positive long reviewId,
                                      @RequestPart(value = "requestBody") @Valid ReviewDto.Patch requestBody,
                                      @RequestPart(value = "file",required = false) MultipartFile[] files){
        requestBody.setReviewId(reviewId);
        Review review = reviewService.updateReview(itemId, reviewMapper.reviewPatchToReview(requestBody),files);

        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewToReviewResponse(review)),HttpStatus.OK);
    }

    @DeleteMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("item-id") @Positive long itemId,
                                       @PathVariable("review-id") @Positive long reviewId){
        reviewService.deleteReview(itemId,reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
