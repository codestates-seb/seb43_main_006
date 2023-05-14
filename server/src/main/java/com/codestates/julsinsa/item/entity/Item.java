package com.codestates.julsinsa.item.entity;

import com.codestates.julsinsa.audit.Auditable;
import com.codestates.julsinsa.image.entity.ItemImage;
import com.codestates.julsinsa.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "item")
@Table(name = "item")
@NoArgsConstructor
@Getter
@Setter
public class Item extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(nullable = false)
    private String title_Kor;

    @Column(nullable = false)
    private String title_Eng;

    @Column(nullable = false)
    private String content;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> categories = new ArrayList<>();

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int volume;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String aroma;

    @Column(nullable = false)
    private String taste;

    @Column(nullable = false)
    private String field;

    @Column(nullable = false)
    private String sales;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private String discountRate;

    @Column(nullable = false)
    private String profile;

    @Column(nullable = false)
    private int reviewCount;

    @Column(nullable = false)
    private double reviewRating;

    @OneToMany(mappedBy = "item")
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemImage> images = new ArrayList<>();
    //아이템카트, 아이템오더

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

    public Item(String title_Kor, int price, int capacity) {
        this.title_Kor = title_Kor;
        this.price = price;
        this.capacity = capacity;
    }
}
