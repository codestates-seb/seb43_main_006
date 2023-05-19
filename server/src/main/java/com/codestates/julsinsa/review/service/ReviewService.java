package com.codestates.julsinsa.review.service;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.image.entity.ReviewImage;
import com.codestates.julsinsa.image.service.ImageService;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.order.repository.OrderRepository;
import com.codestates.julsinsa.review.entity.Review;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.review.repository.ReviewRepository;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;
    private final ReviewRepository reviewRepository;

    private final ImageService imageService;

    private final OrderRepository orderRepository;

    public Review createReview(Review review , long itemId,
                               MultipartFile[] files){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

//        // 구매내역이 있는지 검증하는 로직 추가할것. + 단 1회만 작성 가능
//        List<Order> findOrders = orderRepository.findByMember(findmember);
//        boolean isItemOrdered = findOrders.stream()
//                .anyMatch(order -> order.getItemOrders().stream()
//                        .anyMatch(itemOrder -> itemOrder.getItem().getItemId() == itemId));
//        if (!isItemOrdered) {
//            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_CANCEL);
//        }

        // 아이템 아이디로 아이템 찾기
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

//        // 이미 리뷰를 작성 했는지 확인
//        Optional<Review> existingReview = reviewRepository.findByItemAndMember(item, findmember);
//        if(existingReview.isPresent()){
//            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_TWICE);
//        }


        // 파일 첨부 된거 저장하기
        if(files != null){
            List<ReviewImage> reviewImage = imageService.uploadReviewImage(files, review);
            review.addImage(reviewImage);
        }

        // 리뷰 평점이랑 개수 계산
        int newReviewCount = item.getReviews().size() + 1;
        double newReviewRating = (item.getReviewRating() * item.getReviews().size() + review.getRating()) / newReviewCount;

        item.setReviewCount(newReviewCount);
        item.setReviewRating(newReviewRating);

        review.addItem(item);
        review.addMember(findmember);

        return reviewRepository.save(review);
    }

    public Review findReview(long itemId, long reviewId){
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        Optional<Review> findReview = reviewRepository.findById(reviewId);
        Review review = findReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        if(review.getItem() == item) return review;
        else throw new BusinessLogicException(ExceptionCode.DO_NOT_MATCH);
    }

    //  리뷰 페이지네이션 처리
    public Page<Review> findReviews(long itemId , int page, int size){
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        return reviewRepository.findAllByItem(item,PageRequest.of(page -1 , size, Sort.by("reviewId").descending()));
    }

    public List<Review> findReviews(long itemId){
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        Sort sort = Sort.by(Sort.Direction.DESC, "reviewId");
        return reviewRepository.findAllByItem(item,sort);
    }

    public Review updateReview(long itemId, Review review,MultipartFile[] files){
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        Optional<Review> optionalReview = reviewRepository.findById(review.getReviewId());
        Review findReview = optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        if(findmember.getMemberId() != findReview.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);

        Optional.ofNullable(review.getTitle()).ifPresent(t -> findReview.setTitle(t));
        Optional.ofNullable(review.getContent()).ifPresent(c -> findReview.setContent(c));
        Optional.ofNullable(review.getRating()).ifPresent(r -> {
            double oldRating = findReview.getRating();
            findReview.setRating(r);
            double newRating = r;
            int reviewCount = item.getReviewCount();
            double reviewRating = item.getReviewRating();
            reviewRating = (reviewRating * reviewCount - oldRating + newRating) / reviewCount;
            item.setReviewRating(reviewRating);
        });

        if(files != null){
            List<ReviewImage> reviewImage = imageService.uploadReviewImage(files, review);

            findReview.clearImages();

            findReview.addImage(reviewImage);
        }

        return reviewRepository.save(findReview);
    }


    public void deleteReview(long itemId, long reviewId) {
        Optional<Item> findItem = itemRepository.findById(itemId);
        Item item = findItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        Optional<Review> findReview = reviewRepository.findById(reviewId);
        Review review = findReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        // 관리자면 모든 게시글 지우기 가능 , 로그인계정과 작성자가 같지않다면 401
        if (findmember.getRoles().containsAll(List.of("ADMIN", "USER")) || review.getMember().getMemberId() == findmember.getMemberId()) {
            int newReviewCount = item.getReviews().size() - 1;
            double newReviewRating = (item.getReviewRating() * item.getReviews().size() - review.getRating()) / newReviewCount;
            item.setReviewCount(newReviewCount);
            item.setReviewRating(newReviewRating);

            reviewRepository.delete(review);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }


    }
}
