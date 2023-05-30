package com.codestates.julsinsa.review.entity;

import com.codestates.julsinsa.global.audit.Auditable;
import com.codestates.julsinsa.image.entity.ReviewImage;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String title;


    private String content;

    private double rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @OneToMany(mappedBy = "review",cascade = CascadeType.ALL)
    private List<ReviewImage> reviewImages = new ArrayList<>();

    public void addImage(List<ReviewImage> images){
        for (ReviewImage image : images) {
            reviewImages.add(image);
            if(image.getReview() != this){
                image.setReview(this);
            }
        }
    }

    public void addMember(Member member){
        this.member = member;
        if(!member.getReviews().contains(this)){
            member.getReviews().add(this);
        }
    }

    public void addItem(Item item){
        this.item = item;
        if(!item.getReviews().contains(this)) {
            item.getReviews().add(this);
        }
    }

    // 기존에 연결된 이미지 모두 제거 하고 연결 정보 업데이트
    public void clearImages() {
        reviewImages.forEach(image -> image.setReview(null));
        reviewImages.clear();
    }
}
