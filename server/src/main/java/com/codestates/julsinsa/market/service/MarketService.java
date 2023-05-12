package com.codestates.julsinsa.market.service;


import com.codestates.julsinsa.exception.BusinessLogicException;
import com.codestates.julsinsa.exception.ExceptionCode;
import com.codestates.julsinsa.market.entitiy.Market;
import com.codestates.julsinsa.market.repository.MarketRepository;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Market> searchMarket(String nameKeyword, String addressKeyword, Pageable pageable) {
        if (StringUtils.isBlank(nameKeyword) && StringUtils.isBlank(addressKeyword)) {
            return marketRepository.findAll(pageable);
        }
        if (StringUtils.isNotBlank(nameKeyword) && StringUtils.isNotBlank(addressKeyword)) {
            return marketRepository.findByNameContainingIgnoreCaseAndAddressContainingIgnoreCase(nameKeyword, addressKeyword, pageable);
        }
        else if (StringUtils.isNotBlank(nameKeyword)) {
            return marketRepository.findByNameContainingIgnoreCase(nameKeyword, pageable);
        }
        else if (StringUtils.isNotBlank(addressKeyword)){
            return marketRepository.findByAddressContainingIgnoreCase(addressKeyword,pageable);
        }
        return Page.empty();
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
