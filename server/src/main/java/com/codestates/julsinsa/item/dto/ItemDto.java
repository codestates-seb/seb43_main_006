package com.codestates.julsinsa.item.dto;

import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.review.dto.ReviewDto;
import com.codestates.julsinsa.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ItemDto {

    @Getter
    public static class Post{

        @NotBlank
        private String titleKor;
        @NotBlank
        private String titleEng;
        @NotBlank
        private List<String> categories;

        @NotNull
        private int price;

        @NotNull
        private int capacity;

        @NotNull
        private double volume;

        @NotBlank
        private String country;

        private String aroma;

        private String taste;

        private String field;

        private int sales;

        @NotNull
        private int quantity;

        @NotNull
        private int discountRate;

        @NotBlank
        private String profile;
        @NotBlank
        private String detailedProfile;

        public void setCategories(List<String> categories) {
            this.categories = categories;
        }
    }

    @Getter
    public static class Patch{

        private long itemId;

        @NotBlank
        private String titleKor;
        @NotBlank
        private String titleEng;
        @NotBlank
        private List<String> categories;

        @NotNull
        private int price;

        @NotNull
        private int capacity;

        @NotNull
        private double volume;

        @NotBlank
        private String country;

        private String aroma;

        private String taste;

        private String field;

        private int sales;

        @NotNull
        private int quantity;

        @NotNull
        private int discountRate;

        @NotBlank
        private String profile;
        @NotBlank
        private String detailedProfile;

        public void setCategories(List<String> categories) {
            this.categories = categories;
        }
    }


    @Getter
    @Setter
    public static class Response{

        private Long itemId;
        private String titleKor;

        private String titleEng;

        private String profile;

        private String detailedProfile;

        private List<String> categories;

        private int price;

        private int capacity;

        private double volume;

        private String country;

        private String aroma;

        private String taste;

        private String field;

        private int sales;
        private int quantity;
        private int discountRate;

        private int reviewCount;

        private double reviewRating;
    }

    @Getter
    @Setter
    public static class ItemsResponse{
        private Long itemId;
        private String titleKor;
        private int discountRate;
        private int price;
        private List<String> categories;

        private String profile;

        private int reviewCount;

        private double reviewRating;
    }



    @AllArgsConstructor
    @Getter
    @Setter
    public static class favoriteItemResponse {

        private Long itemId;
        private String titleKor;
        private int price;

        private int quantity;
        private int capacity;

        private double reviewRating;

        private String profile;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class FavoriteStatusDto{
        private boolean like;
    }
}
