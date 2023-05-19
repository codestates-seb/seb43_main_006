package com.codestates.julsinsa.market.controller;

import com.codestates.julsinsa.market.dto.MarketPostDto;
import com.codestates.julsinsa.market.dto.MarketResponseDto;
import com.codestates.julsinsa.market.mapper.MarketMapper;
import com.codestates.julsinsa.market.service.MarketService;
import com.codestates.julsinsa.market.dto.MarketPatchDto;
import com.codestates.julsinsa.market.entitiy.Market;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/marts")
public class MarketController {
    private final MarketMapper mapper;
    private final MarketService marketService;

    @PostMapping
    public ResponseEntity postMarket(@RequestBody MarketPostDto marketPostDto) {
        Market market = marketService.createMarket(mapper.marketPostDtoToMarket(marketPostDto));

        return new ResponseEntity<>(mapper.marketToMarketResponseDto(market), HttpStatus.CREATED);
    }

    @PatchMapping("/{market-id}")
    public ResponseEntity patchMarket(@PathVariable("market-id") @Positive long marketId,
                                      @RequestBody MarketPatchDto marketPatchDto){
        marketPatchDto.setMarketId(marketId);

        Market market = marketService.updateMarket(mapper.marketPatchDtoToMarket(marketPatchDto));

        return new ResponseEntity<>(mapper.marketToMarketResponseDto(market), HttpStatus.OK);
    }

    @GetMapping("/{market-id}")
    public ResponseEntity getMarket(@PathVariable("market-id") @Positive Long marketId) {
        Market market = marketService.findMarket(marketId);

        return new ResponseEntity<>(market, HttpStatus.OK);
    }

    // 전체 목록 조회하기
    @GetMapping
    public ResponseEntity<Page<MarketResponseDto>> getMarkets(@PageableDefault(size = 30, page = 0, sort = "marketId",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Market> marketPage = marketService.findMarkets(pageable);
        Page<MarketResponseDto> marketResponseDtoPage = mapper.marketPageToMarketResponseDto(marketPage);
        return  new ResponseEntity<>(marketResponseDtoPage, HttpStatus.OK);
    }

    // 검색 기능
    @GetMapping("/search")
    public ResponseEntity<Page<MarketResponseDto>> searchMarket(@RequestParam(required = false) String name,
                                                                @RequestParam(required = false) String address,
                                                                @PageableDefault(size = 30, page = 0, sort = "marketId",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Market> marketPage = marketService.searchMarket(name, address, pageable);
        Page<MarketResponseDto> marketResponseDtoPage = mapper.marketPageToMarketResponseDto(marketPage);

        return new ResponseEntity<>(marketResponseDtoPage, HttpStatus.OK);
    }


    @DeleteMapping("/{market-id}")
    public ResponseEntity deleteMarket(@PathVariable("market-id") @Positive Long marketId) {
        marketService.deleteMarket(marketId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
