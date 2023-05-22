package com.codestates.julsinsa.member.entity;

import com.codestates.julsinsa.global.audit.Auditable;
import com.codestates.julsinsa.cart.entity.Cart;
import com.codestates.julsinsa.item.entity.Favorite;
import com.codestates.julsinsa.order.entity.Order;
import com.codestates.julsinsa.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
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

    @Email
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

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "CART_ID")
    private Cart cart;

    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();

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

    public void addCart(Cart cart){
        this.cart = cart;
        if(cart.getMember() != this){
            cart.setMember(this);
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
