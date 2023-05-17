import styled from "styled-components";
import { AlcoholListData } from "../../types/AlcholInterfaces";

// components
import ReviewRating from "../Common/ReviewRating";
import PriceDisplay from "../Common/PriceDisplay";

interface ItemProps {
  item: AlcoholListData;
}

const AlcoholItemContainer = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontColor};
  margin-bottom: 10px;
  line-height: 20px;
  font-size: 15px;

  .item_img {
    width: 100%;
    height: 300px;
    ${({ theme }) => theme.common.flexCenter};
    border-bottom: 3.5px solid ${({ theme }) => theme.colors.bg};
    margin-bottom: 6px;
    position: relative;
    img {
      height: 90%;
      max-width: 100%;
    }
    &:hover {
      border: none;
      border-bottom: 3.5px solid ${({ theme }) => theme.colors.themeColor};
    }
  }
  .item_content {
    padding: 3px 0 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item_title {
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
    }
    .item_discount_rate {
      font-weight: 700;
      color: #a84448;
      margin-right: 10px;
    }
    .item_price {
      font-weight: 700;
      line-height: 18px;
    }
    .item_review_rating {
      display: flex;
      align-items: center;

      p {
        margin-top: 5px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;

const AlcoholListItem = ({ item }: ItemProps) => {
  return (
    <AlcoholItemContainer>
      <div className="item_img">
        <img src={item.profile} />
      </div>
      <div className="item_content">
        <p className="item_title">{item.titleKor}</p>
        <div>
          <span className="item_discount_rate">{item.discountRate}%</span>
          <span className="item_price">
            <PriceDisplay price={item.price} />원
          </span>
        </div>
        <div className="item_review_rating">
          <ReviewRating size={16} reviewRating={item.reviewRating} />
          <p>({item.reviewCount})</p>
        </div>
      </div>
    </AlcoholItemContainer>
  );
};

export default AlcoholListItem;
