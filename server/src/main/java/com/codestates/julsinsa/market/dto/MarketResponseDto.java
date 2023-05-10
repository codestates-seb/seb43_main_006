package com.codestates.julsinsa.market.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarketResponseDto {

    private Long marketId;
    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
