package com.codestates.julsinsa.member.entity;

import com.codestates.julsinsa.audit.Auditable;
import com.codestates.julsinsa.item.entity.Favorite;
import com.codestates.julsinsa.review.entity.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String realName;

    private String displayName;

    private String email;

    public Member(String email) {
        this.email = email;
    }

    private String password;

    private String phone;

    private LocalDate birthDate;

    private String mailKey;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Favorite> favorites = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    private boolean passwordIssued = false;

    private boolean oauth2Registered = false;

    //관계 편의 메서드
    public void addFavorite(Favorite favorite){
        favorites.add(favorite);
        if(favorite.getMember() != this) {
            favorite.setMember(this);
        }
    }

    public void addReview(Review review) {
        reviews.add(review);
        if(review.getMember() != this) {
            review.setMember(this);
        }
    }

    public enum MemberStatus {

        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

}