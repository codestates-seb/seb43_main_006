import React from "react";
import styled from "styled-components";

import alcohol from "../../assets/images/alcohol.png";
import { AiFillHeart } from "react-icons/ai";

// components
// import ReviewRating from "../Common/ReviewRating";
import ClickFavoriteItem from "../Common/ClickFavoriteItem";
import PriceRegular from "../Common/PriceRegular";

const AlcoholItemContainer = styled.div`
  margin-top: 30px;
  display: flex;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
`;

const StyledItemImgBox = styled.div`
  flex: 0 1 50%;
  display: flex;
  justify-content: center;
  padding: 0 20px;

  img {
    height: 100%;
    margin: auto;
    max-width: 100%;
    object-fit: scale-down;
    width: auto;
  }
`;

const StyledItemBuyBox = styled.div`
  flex: 0 1 50%;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .buy_titlebox {
    border-bottom: 3.5px solid ${({ theme }) => theme.colors.themeColor};
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  > .buy_titlebox > .buy_title {
    font-size: 28px;
    font-weight: 600;
  }
  > .item_review_rating {
    display: flex;
    align-items: center;
    p {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .buy_price {
    padding-top: 20px;
    font-size: 16px;

    > .buy_item_content {
      display: flex;
      line-height: 30px;
      > .buy_item_content_title {
        flex: 0 0 30%;
      }
    }
    .buy_price_text {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .buy_count {
    width: 100%;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid lightgray;
    margin: 20px 0;
  }

  .buy_cart {
    width: 100%;
    display: flex;
    gap: 10px;

    button {
      font-weight: 600;
      border: none;
      width: 100%;
      padding: 14px 0;
      letter-spacing: 1px;
      border-radius: 2px;
      cursor: pointer;
    }
    .cart_btn {
      color: ${({ theme }) => theme.colors.themeColor};
      background: #fff;
      border: solid 1px lightgray;
    }
    .buy_btn {
      background: ${({ theme }) => theme.colors.themeColor};
      color: #fff;
    }
  }
`;

const AlcoholItem = () => {
  return (
    <AlcoholItemContainer>
      <StyledItemImgBox>
        <img src={alcohol} />
      </StyledItemImgBox>
      <StyledItemBuyBox>
        <div className="buy_titlebox">
          <p className="buy_title">화요 53</p>
          <div className="item_like">
            <ClickFavoriteItem icon={AiFillHeart} color="#e4e5e9" activeColor="#D43635" size={30} />
          </div>
        </div>
        {/* 별점 (별점 갯수) */}
        {/* <div className="item_review_rating">
            <ReviewRating size={20} reviewRating={4.5} />
            <p>(12)</p>
          </div> */}
        <div className="buy_price">
          <div className="buy_item_content">
            <span className="buy_item_content_title">판매가</span>
            <span className="buy_price_text">
              <PriceRegular price={47900} />원
            </span>
          </div>
          <div className="buy_item_content">
            <span className="buy_item_content_title">용량</span>
            <span>125ml</span>
          </div>
        </div>
        <div className="buy_count">
          <p>현재 남은 수량 중 최대 10개 구매 가능</p>
          <div>
            <div>상품 수량 칸</div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              <PriceRegular price={47900} />원
            </div>
          </div>
        </div>
        <div className="buy_cart">
          <button className="cart_btn">장바구니</button>
          <button className="buy_btn">구매하기</button>
        </div>
      </StyledItemBuyBox>
    </AlcoholItemContainer>
  );
};

export default AlcoholItem;
