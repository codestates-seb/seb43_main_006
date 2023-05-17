package com.codestates.julsinsa.item.controller;

import com.codestates.julsinsa.dto.MultiResponseDto;
import com.codestates.julsinsa.dto.SingleResponseDto;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.mapper.ItemMapper;
import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.review.dto.ReviewDto;
import com.codestates.julsinsa.review.entity.Review;
import com.codestates.julsinsa.review.mapper.ReviewMapper;
import com.codestates.julsinsa.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
public class ItemController {

    private final ItemService itemService;

    private final ItemMapper mapper;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
//    @GetMapping
//    public ResponseEntity getItems(@Positive @RequestParam int page,
//                                   @Positive @RequestParam int size){
//
//        Page<Item> pageItems = itemService.findItems(page, size);
//        List<Item> items = pageItems.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items),pageItems),HttpStatus.OK);
//    }

//    @GetMapping
//    public ResponseEntity getItemByCategories(@Positive @RequestParam int page,
//                                              @Positive @RequestParam int size,
//                                              @RequestParam(required = false) String category,
//                                              @RequestParam(required = false) String sortBy){
//        Page<Item> pageItems;
//        List<Item> items;
//        if(category != null){
//            pageItems = itemService.findItemsByCategory(page, size, category);
//            items = pageItems.getContent();
//        }else{
//            if(sortBy != null){
//                switch(sortBy){
//                    case "sales":
//                        pageItems = itemService.findItemsBySales(page,size);
//                        break;
//                    case "discountRate":
//                        pageItems = itemService.findItemsByDiscountRate(page,size);
//                        break;
//                    case "highPrice":
//                        pageItems = itemService.findItemsByHighPrice(page,size);
//                        break;
//                    case "lowPrice":
//                        pageItems = itemService.findItemsByLowPrice(page,size);
//                        break;
//                    case "latest":
//                        pageItems = itemService.findItems(page, size);
//                        break;
//                    default:
//                        pageItems = itemService.findItems(page, size);
//                        break;
//                }
//            } else {
//                pageItems = itemService.findItems(page, size);
//            }
//            items = pageItems.getContent();
//        }
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items),pageItems),HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity getItemByCategories(@Positive @RequestParam int page,
                                              @Positive @RequestParam int size,
                                              @RequestParam(required = false) String category,
                                              @RequestParam(required = false) String sortBy) {
        Page<Item> pageItems;
        List<Item> items;

        if (category != null) {
            if (sortBy != null) {
                switch (sortBy) {
                    case "sales":
                        pageItems = itemService.findItemsByCategoryAndSortBySales(page, size, category);
                        break;
                    case "discountRate":
                        pageItems = itemService.findItemsByCategoryAndSortByDiscountRate(page, size, category);
                        break;
                    case "highPrice":
                        pageItems = itemService.findItemsByCategoryAndSortByHighPrice(page, size, category);
                        break;
                    case "lowPrice":
                        pageItems = itemService.findItemsByCategoryAndSortByLowPrice(page, size, category);
                        break;
                    case "latest":
                        pageItems = itemService.findItemsByCategory(page, size, category);
                        break;
                    default:
                        pageItems = itemService.findItemsByCategory(page, size, category);
                        break;
                }
            } else {
                pageItems = itemService.findItemsByCategory(page, size, category);
            }
        } else {
            if (sortBy != null) {
                switch (sortBy) {
                    case "sales":
                        pageItems = itemService.findItemsBySales(page, size);
                        break;
                    case "discountRate":
                        pageItems = itemService.findItemsByDiscountRate(page, size);
                        break;
                    case "highPrice":
                        pageItems = itemService.findItemsByHighPrice(page, size);
                        break;
                    case "lowPrice":
                        pageItems = itemService.findItemsByLowPrice(page, size);
                        break;
                    case "latest":
                        pageItems = itemService.findItems(page, size);
                        break;
                    default:
                        pageItems = itemService.findItems(page, size);
                        break;
                }
            } else {
                pageItems = itemService.findItems(page, size);
            }
        }

        items = pageItems.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items), pageItems), HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity searchTitle(@RequestParam @Positive int page,
                                      @RequestParam @Positive int size,
                                      @RequestParam(required = false) String title){
        Page<Item> itemPage = itemService.searchByTitle(page, size, title);
        List<Item> items = itemPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items),itemPage),HttpStatus.OK);
    }

    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") @Positive long itemId){
        Item item = itemService.findItem(itemId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.itemToItemResponseDto(item)),HttpStatus.OK);
    }

    @PostMapping("/{item-id}/favorite")
    public ResponseEntity postFavorite(@PathVariable("item-id") @Positive long itemId){
        Item item = itemService.createFavorite(itemId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{item-id}/favorite")
    public ResponseEntity deleteFavorite(@PathVariable("item-id") @Positive long itemId) {
        Item item = itemService.cancleFavorite(itemId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{item-id}/is-favorite")
    public ResponseEntity checkFavoriteStatus(@PathVariable("item-id") @Positive long itemId) {

        // 아이템의 찜 여부 조회
        ItemDto.FavoriteStatusDto favoriteStatusDto = itemService.checkFavoriteStatus(itemId);

        return new ResponseEntity<>(new SingleResponseDto<>(favoriteStatusDto),HttpStatus.OK);
    }

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

    // 리뷰 페이지네이션 처리
//    @GetMapping("/{item-id}/reviews")
//    public ResponseEntity getReviews(@PathVariable("item-id") @Positive long itemId,
//                                    @Positive @RequestParam int page,
//                                     @Positive @RequestParam int size){
//        Page<Review> reviewPage = reviewService.findReviews(itemId, page, size);
//        List<Review> reviews = reviewPage.getContent();
//
//        return new ResponseEntity<>(new MultiResponseDto<>(reviewMapper.reviewsToReviewResponses(reviews),reviewPage),HttpStatus.OK);
//    }


    @GetMapping("/{item-id}/reviews")
    public ResponseEntity getReviews(@PathVariable("item-id") @Positive long itemId){
        List<Review> reviews = reviewService.findReviews(itemId);


        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewsToReviewResponses(reviews)),HttpStatus.OK);
    }

    @PatchMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity patchReview(@PathVariable("item-id") @Positive long itemId,
                                      @PathVariable("review-id") @Positive long reviewId,
                                      @RequestBody @Valid ReviewDto.Patch requestBody){
        requestBody.setReviewId(reviewId);
        Review review = reviewService.updateReview(itemId, reviewMapper.reviewPatchToReview(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewToReviewResponse(review)),HttpStatus.OK);
    }

    @DeleteMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("item-id") @Positive long itemId,
                                       @PathVariable("review-id") @Positive long reviewId){
        reviewService.deleteReview(itemId,reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
