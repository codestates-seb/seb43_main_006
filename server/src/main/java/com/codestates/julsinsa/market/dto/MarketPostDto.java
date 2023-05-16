package com.codestates.julsinsa.market.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MarketPostDto {

    private Long lat;
    private Long lng;
    private boolean choice;
    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
