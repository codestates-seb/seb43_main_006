package com.codestates.julsinsa.item.controller;

import com.amazonaws.Response;
import com.codestates.julsinsa.dto.MultiResponseDto;
import com.codestates.julsinsa.dto.SingleResponseDto;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.item.dto.ItemPatchDto;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.mapper.ItemMapper;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.item.service.ItemService;
import com.codestates.julsinsa.review.dto.ReviewDto;
import com.codestates.julsinsa.review.entity.Review;
import com.codestates.julsinsa.review.mapper.ReviewMapper;
import com.codestates.julsinsa.review.service.ReviewService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.parser.Entity;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
@Validated
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper mapper;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final ItemRepository itemRepository;


    // 상품 전체 조회
    @GetMapping
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {

        Page<Item> pageItems = itemService.findItems(page, size);
        List<Item> items = pageItems.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items), pageItems), HttpStatus.OK);
    }

    @PostMapping("/{item-id}/favorite")
    public ResponseEntity postFavorite(@PathVariable("item-id") @Positive long itemId) {
        Item item = itemService.createFavorite(itemId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{item-id}/favorite")
    public ResponseEntity deleteFavorite(@PathVariable("item-id") @Positive long itemId) {
        Item item = itemService.cancleFavorite(itemId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{item-id}/reviews")
    public ResponseEntity postReview(@PathVariable("item-id") @Positive long itemId,
                                     @RequestPart(value = "requestBody") @Valid ReviewDto.Post requestBody,
                                     @RequestPart(value = "file", required = false) MultipartFile[] files) {

        Review review = reviewService.createReview(reviewMapper.reviewPostToReview(requestBody), itemId, files);


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity getReview(@PathVariable("item-id") @Positive long itemId,
                                    @PathVariable("review-id") @Positive long reviewId) {
        Review review = reviewService.findReview(itemId, reviewId);

        return new ResponseEntity<>(reviewMapper.reviewToReviewResponse(review), HttpStatus.OK);
    }

    @GetMapping("/{item-id}/reviews")
    public ResponseEntity getReviews(@PathVariable("item-id") @Positive long itemId,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Review> reviewPage = reviewService.findReviews(itemId, page, size);
        List<Review> reviews = reviewPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(reviewMapper.reviewsToReviewResponses(reviews), reviewPage), HttpStatus.OK);
    }

    @PatchMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity patchReview(@PathVariable("item-id") @Positive long itemId,
                                      @PathVariable("review-id") @Positive long reviewId,
                                      @RequestBody @Valid ReviewDto.Patch requestBody) {
        requestBody.setReviewId(reviewId);
        Review review = reviewService.updateReview(itemId, reviewMapper.reviewPatchToReview(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>(reviewMapper.reviewToReviewResponse(review)), HttpStatus.OK);
    }

    @DeleteMapping("/{item-id}/reviews/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("item-id") @Positive long itemId,
                                       @PathVariable("review-id") @Positive long reviewId) {
        reviewService.deleteReview(itemId, reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    // 특정 상품 상세 조회
    @GetMapping("/item/{item-id}")
    public ResponseEntity detailItems (@PathVariable Long id, Item item) {
        item = itemService.detailItems(id);
        ItemDto.Response itemDtoResponse = mapper.itemToItemResponseDto(item);
        return new ResponseEntity(itemDtoResponse, HttpStatus.OK);
    }

    // 상품 검색
    @PostMapping("/item/search")
    public ResponseEntity ItemSearch(@RequestBody String title ,
                           @Positive @RequestParam int page,
                           @Positive @RequestParam int size) {
        Page<Item> pageItems = itemService.findItems(page, size);
        List<Item> items = itemService.search(title);

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.itemsToItemResponseDtos(items), pageItems), HttpStatus.OK);
    }

    // 상품 정보 수정
    @PutMapping("/items{item-id}")
    public ResponseEntity updateItem(@PathVariable Long id, Item item) {
        item = itemService.detailItems(id);
        ItemPatchDto.ItemPatch itemPatch = mapper.itemToItemPatchDto(item);
        itemService.updateItem(itemPatch);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 상품 삭제
    @DeleteMapping("/items{item-id}")
    public ResponseEntity deleteItem(@PathVariable Long id, Item item) {

        itemService.deleteItem(id);

        return new ResponseEntity(HttpStatus.OK);

    }

    // 상품 등록
    @PostMapping("/item")
    public ResponseEntity postItem(@RequestBody ItemDto.Post requestBody) {
        Item item = mapper.itemPostItem(requestBody);
        Item createItem = itemService.createItem(item);
        return new ResponseEntity(HttpStatus.OK);
    }








}

