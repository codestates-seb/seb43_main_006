import React from "react";
import styled from "styled-components";
import alcohol from "../assets/images/alcohol.jpeg";

// components
import ReviewRating from "../components/Common/ReviewRating";
import PriceRegular from "../components/Common/PriceRegular";

const AlcoholDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 25px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

const AlcoholBox = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;

  .img_box {
    flex: 0 1 50%;
    display: flex;
    justify-content: flex-end;
  }
  .buy_box {
    > .buy_title {
      font-size: 35px;
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

    .price_box {
      margin-top: 30px;
      .item_discount_rate {
        font-weight: 700;
        font-size: 20px;
        color: ${({ theme }) => theme.colors.themeColor};
        padding-top: 10px;
        margin-right: 10px;
      }
      .item_price {
        font-weight: 700;
        line-height: 18px;
        font-size: 18px;
      }
    }
  }
`;

const ItemBox = styled.div`
  flex: 0 1 50%;
  padding: 0 20px;
`;

const AlcoholDetail = () => {
  return (
    <AlcoholDetailContainer>
      <AlcoholBox>
        <ItemBox>
          <img src={alcohol} width={"70%"} />
        </ItemBox>
        <div className="buy_box">
          <p className="buy_title">화요 53</p>
          <div className="item_review_rating">
            <ReviewRating size={20} reviewRating={4.5} />
            <p>(12)</p>
          </div>
          <div className="price_box">
            <span className="item_discount_rate">25%</span>
            <span className="item_price">
              <PriceRegular price={47900} />원
            </span>
          </div>
        </div>
      </AlcoholBox>
    </AlcoholDetailContainer>
  );
};

export default AlcoholDetail;
