package com.codestates.julsinsa.market.mapper;

import com.codestates.julsinsa.market.dto.MarketPostDto;
import com.codestates.julsinsa.market.dto.MarketResponseDto;
import com.codestates.julsinsa.market.dto.MarketPatchDto;
import com.codestates.julsinsa.market.entitiy.Market;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MarketMapper {

    public Market marketPostDtoToMarket(MarketPostDto marketPostDto) {
        Market market = new Market();

        market.setLat(marketPostDto.getLat());
        market.setLng(marketPostDto.getLng());
        market.setChoice(marketPostDto.isChoice());
        market.setName(marketPostDto.getName());
        market.setPhone(marketPostDto.getPhone());
        market.setAddress(marketPostDto.getAddress());
        market.setWorkTime(marketPostDto.getWorkTime());
        market.setComment(marketPostDto.getComment());

        return market;
    }

    public Market marketPatchDtoToMarket(MarketPatchDto marketPatchDto) {
        Market market = new Market();

        market.setMarketId(marketPatchDto.getMarketId());
        market.setName(marketPatchDto.getName());
        market.setPhone(marketPatchDto.getPhone());
        market.setAddress(marketPatchDto.getAddress());
        market.setWorkTime(marketPatchDto.getWorkTime());
        market.setComment(marketPatchDto.getComment());

        return market;
    }

    public MarketResponseDto marketToMarketResponseDto(Market market) {
        MarketResponseDto marketResponseDto = new MarketResponseDto();

        marketResponseDto.setMarketId(market.getMarketId());
        marketResponseDto.setLat(market.getLat());
        marketResponseDto.setLng(market.getLng());
        marketResponseDto.setChoice(market.isChoice());
        marketResponseDto.setName(market.getName());
        marketResponseDto.setPhone(market.getPhone());
        marketResponseDto.setAddress(market.getAddress());
        marketResponseDto.setWorkTime(market.getWorkTime());
        marketResponseDto.setComment(market.getComment());

        return marketResponseDto;
    }

    public Page<MarketResponseDto> marketPageToMarketResponseDto(Page<Market> marketPage) {
        Page<MarketResponseDto> map = marketPage.map(market -> marketToMarketResponseDto(market));

        return  map;
    }
}
