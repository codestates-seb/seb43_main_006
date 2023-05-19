package com.codestates.julsinsa.item.entity;

import com.codestates.julsinsa.global.audit.Auditable;
import com.codestates.julsinsa.cart.entity.ItemCart;
import com.codestates.julsinsa.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Item extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(nullable = false)
    private String titleKor;

    private String titleEng;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> categories = new ArrayList<>();

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private double volume;

    @Column(nullable = false)
    private String country;

    private String aroma;

    private String taste;

    private String field;

    @Column(nullable = false)
    private int sales;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int discountRate;

    @Column(nullable = false)
    private String profile;

    @Column(nullable = false)
    private String detailedProfile;

    @Column(nullable = false)
    private int reviewCount;

    @Column(nullable = false)
    private double reviewRating;

    @OneToMany(mappedBy = "item")
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<Review> reviews = new ArrayList<>();

//    @OneToMany(mappedBy = "item")
//    private List<ItemImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemCart> itemCarts = new ArrayList<>();

    //관계 편의 메서드
    public void addFavorite(Favorite favorite){
        favorites.add(favorite);
        if(favorite.getItem() != this) {
            favorite.setItem(this);
        }
    }

    public void addReview(Review review){
        reviews.add(review);
        if(review.getItem() != this) {
            review.setItem(this);
        }
    }

    public Item(String titleKor, int price, int capacity) {
        this.titleKor = titleKor;
        this.price = price;
        this.capacity = capacity;
    }
}
