package com.codestates.sulsinsa.market.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MarketPostDto {

    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
