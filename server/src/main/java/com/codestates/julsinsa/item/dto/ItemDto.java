package com.codestates.julsinsa.item.dto;

import com.codestates.julsinsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ItemDto {

    @Getter
    @Setter
    public static class Response{

        private Long itemId;
        private String title_Kor;

        private String title_Eng;

        private String content;

        private List<String> categories;

        private int price;

        private int capacity;

        private int volume;

        private String country;

        private String aroma;

        private String taste;

        private String field;

        private String sales;
        private int quantity;
        private String discountRate;

        private int reviewCount;

        private double reviewRating;
    }

    @Getter
    @Setter
    public static class ItemsResponse{
        private Long itemId;
        private String title_Kor;
        private String discountRate;
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

        private String title_Kor;
        private int price;

        private int quantity;
        private int capacity;

        private double reviewRating;

    }
}
