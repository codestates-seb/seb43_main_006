import styled from "styled-components";
import { AlcoholListData } from "../../types/AlcholInterfaces";
import { AiFillHeart } from "react-icons/ai";

// components
import ReviewRating from "../Common/ReviewRating";
import PriceRegular from "../Common/PriceRegular";
import ClickFavoriteItem from "../Common/ClickFavoriteItem";

interface ItemProps {
  item: AlcoholListData;
}

const AlcoholItemContainer = styled.div`
  flex: 1 1 calc(100 / 3) %;
  min-width: 0;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontColor};
  margin-bottom: 10px;
  line-height: 20px;
  font-size: 15px;

  .item_img {
    width: 300px;
    height: 300px;
    ${({ theme }) => theme.common.flexCenter};
    border-bottom: 3.5px solid ${({ theme }) => theme.colors.bg};
    margin-bottom: 6px;
    position: relative;
    img {
      height: 90%;
    }
    &:hover {
      border: none;
      border-bottom: 3.5px solid ${({ theme }) => theme.colors.themeColor};
    }
    .item_like {
      display: none;
    }
    img:hover ~ .item_like {
      display: block;
      position: absolute;
      top: 10px;
      right: 10px;
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
      color: ${({ theme }) => theme.colors.themeColor};
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
        color: 
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
        <div className="item_like">
          <ClickFavoriteItem icon={AiFillHeart} color="#e4e5e9" activeColor="#D43635" size={20} />
        </div>
      </div>
      <div className="item_content">
        <p className="item_title">{item.title_Kor}</p>
        <div>
          <span className="item_discount_rate">{item.discountRate}</span>
          <span className="item_price">
            <PriceRegular price={item.price} />원
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
