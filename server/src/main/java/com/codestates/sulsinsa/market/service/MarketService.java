package com.codestates.sulsinsa.market.service;

import com.codestates.sulsinsa.exception.BusinessLogicException;
import com.codestates.sulsinsa.exception.ExceptionCode;
import com.codestates.sulsinsa.market.entitiy.Market;
import com.codestates.sulsinsa.market.repository.MarketRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MarketService {
    MarketRepository marketRepository;

    public MarketService(MarketRepository marketRepository) {
        this.marketRepository = marketRepository;
    }

    public Market createMarket(Market market) {
        return marketRepository.save(market);
    }

    public Market updateMarket(Market market) {
        Market findMarket = findVerifiedMarket(market.getMarketId());

        Optional.ofNullable(market.getName())
                .ifPresent(name -> findMarket.setName(name));
        Optional.ofNullable(market.getPhone())
                .ifPresent(phone -> findMarket.setPhone(phone));
        Optional.ofNullable(market.getAddress())
                .ifPresent(address -> findMarket.setAddress(address));
        Optional.ofNullable(market.getWorkTime())
                .ifPresent(workTime -> findMarket.setWorkTime(workTime));
        Optional.ofNullable(market.getComment())
                .ifPresent(comment -> findMarket.setComment(comment));

        return marketRepository.save(findMarket);
    }

    public Market findMarket(Long marketId) {
        return findVerifiedMarket(marketId);
    }

    public Page<Market> findMarkets(Pageable pageable) {
        Page<Market> marketPage = marketRepository.findAll(pageable);

        return  marketPage;
    }

    public void deleteMarket(Long marketId) {
        Market market = findVerifiedMarket(marketId);

        marketRepository.delete(market);
    }

    private Market findVerifiedMarket(Long marketId) {
        Optional<Market> optionalMarket = marketRepository.findById(marketId);
        Market market = optionalMarket.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MARKET_NOT_FOUND));
        return market;
    }
}
