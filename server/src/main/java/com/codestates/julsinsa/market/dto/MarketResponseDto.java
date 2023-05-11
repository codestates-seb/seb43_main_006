package com.codestates.julsinsa.market.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MarketResponseDto {

    private Long marketId;
    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
