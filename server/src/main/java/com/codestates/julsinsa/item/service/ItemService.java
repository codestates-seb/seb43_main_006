package com.codestates.julsinsa.item.service;

import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.item.entity.Favorite;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;


    public Item createItem(Item item){
        //관리자 페이지가 만들어지면 관리자만 등록할 수 있게 구현

        Optional<Item> optionalItem = itemRepository.findByTitleKor(item.getTitleKor());
        if(optionalItem.isPresent()) throw new BusinessLogicException(ExceptionCode.ITEM_EXISTS);

        return itemRepository.save(item);
    }

    public Item updateItem(Item item){
        //관리자 페이지가 만들어지면 관리자만 수정할 수 있게 구현

        Optional<Item> optionalItem = itemRepository.findById(item.getItemId());
        Item findItem = optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        Optional.ofNullable(item.getTitleKor()).ifPresent(findItem::setTitleKor);
        Optional.ofNullable(item.getTitleEng()).ifPresent(findItem::setTitleEng);
        Optional.ofNullable(item.getCategories()).ifPresent(findItem::setCategories);
        Optional.ofNullable(item.getPrice()).ifPresent(findItem::setPrice);
        Optional.ofNullable(item.getCapacity()).ifPresent(findItem::setCapacity);
        Optional.ofNullable(item.getVolume()).ifPresent(findItem::setVolume);
        Optional.ofNullable(item.getCountry()).ifPresent(findItem::setCountry);
        Optional.ofNullable(item.getAroma()).ifPresent(findItem::setAroma);
        Optional.ofNullable(item.getTaste()).ifPresent(findItem::setTaste);
        Optional.ofNullable(item.getField()).ifPresent(findItem::setField);
        Optional.ofNullable(item.getSales()).ifPresent(findItem::setSales);
        Optional.ofNullable(item.getQuantity()).ifPresent(findItem::setQuantity);
        Optional.ofNullable(item.getDiscountRate()).ifPresent(findItem::setDiscountRate);
        Optional.ofNullable(item.getProfile()).ifPresent(findItem::setProfile);
        Optional.ofNullable(item.getDetailedProfile()).ifPresent(findItem::setDetailedProfile);

        return itemRepository.save(findItem);
    }

    public void deleteItem(long itemId){
        //관리자 페이지가 만들어지면 관리자만 삭제할 수 있게 구현

        Optional<Item> optionalItem = itemRepository.findById(itemId);
        Item findItem = optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        itemRepository.delete(findItem);
    }

    // 최신순 정렬
    public Page<Item> findItems(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("itemId").descending()));
    }

    //판매순 정렬
    public Page<Item> findItemsBySales(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("sales").descending()));
    }

    //할인율 정렬
    public Page<Item> findItemsByDiscountRate(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("discountRate").descending()));
    }

    //높은 가격순 정렬
    public Page<Item> findItemsByHighPrice(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("price").descending()));
    }
    // 낮은 가격순 정렬
    public Page<Item> findItemsByLowPrice(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("price").ascending()));
    }

    // 카테고리별 술 찾기
    public Page<Item> findItemsByCategory(int page,int size,String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("itemId").descending()));
    }
    //////////////////////////////////////
    // 카테고리와 판매량으로 아이템 필터링
    public Page<Item> findItemsByCategoryAndSortBySales(int page, int size, String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("sales").descending()));
    }

    // 카테고리와 할인율로 아이템 필터링
    public Page<Item> findItemsByCategoryAndSortByDiscountRate(int page, int size, String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("discountRate").descending()));
    }

    // 카테고리와 가격 오름차순으로 아이템 필터링
    public Page<Item> findItemsByCategoryAndSortByHighPrice(int page, int size, String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("price").descending()));
    }

    // 카테고리와 가격 내림차순으로 아이템 필터링
    public Page<Item> findItemsByCategoryAndSortByLowPrice(int page, int size, String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("price").ascending()));
    }

    /////////////////////////
    // 술 검색
    public Page<Item> searchByTitle(int page, int size, String title) {
        if(title == null) title = "";

        return itemRepository.findAllByTitleKorContaining(title,PageRequest.of(page-1,size,Sort.by("itemId").descending()));
    }

    // 술 상세 조회
    public Item findItem(long itemId){
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        return optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

    // 찜 하기
    public Item createFavorite(long itemId){

        Item findItem = findVerifedItem(itemId);

        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        // 찜이 이미 되있는 경우 Exception 호출
        for(Favorite favorite : findmember.getFavorites()){
            if(favorite.getItem().getItemId() == findItem.getItemId()) {
                throw new BusinessLogicException(ExceptionCode.LIKE_NOT_TWICE);
            }
        }

//        Favorite newFavorite = new Favorite();
//        newFavorite.setMember(findmember);
//        newFavorite.setItem(findItem);
//        newFavorite.setLiked(true); // 찜한 상태로 설정
//
//        findmember.getFavorites().add(newFavorite); // 회원의 찜 목록에 추가

        itemRepository.upFavorite(findItem.getItemId(), findmember.getMemberId());

        return findItem;
    }


    // 찜 취소
    public Item cancleFavorite(long itemId) {
        Item findItem = findVerifedItem(itemId);

        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        findItem.getFavorites().stream()
                .filter(f -> f.getMember() == findmember)
                .findFirst().orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_CANCEL));

        itemRepository.downFavorite(findItem.getItemId(), findmember.getMemberId());

        return findItem;
    }

    public ItemDto.FavoriteStatusDto checkFavoriteStatus(long itemId){
        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findByEmailMember = memberRepository.findByEmail(principal);
        Member member = findByEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        boolean like = item.getFavorites().stream()
                .anyMatch(favorite -> favorite.getMember().getMemberId().equals(member.getMemberId()));

        return new ItemDto.FavoriteStatusDto(like);

    }
    public Item findVerifedItem(long itemId){
        Optional<Item> findByItem = itemRepository.findById(itemId);
        return findByItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

}
