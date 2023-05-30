import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AlcoholData, ItemOrder } from "types/AlcholInterfaces";
import { createItemCart } from "@services/api";

// components
import ClickFavoriteItem from "@components/Common/ClickFavoriteItem";
import PriceDisplay from "@components/Common/PriceDisplay";
import { ButtonLight, ButtonDark } from "@components/Common/Button";
import QuantityControl from "@components/AlcoholDetailPage/QuantityControl";
import Alert from "@components/Common/AlertModal";

interface ItemDatailProps {
  data: AlcoholData;
}

const AlcoholItemBuyContainer = styled.div`
  margin-top: 30px;
  display: flex;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    display: block;
  }
`;

const StyledItemImgBox = styled.div`
  flex: 0 1 50%;
  display: flex;
  justify-content: center;
  padding: 0 20px;

  img {
    height: 510px;
    object-fit: scale-down;
    min-width: 380px;
    width: 80%;
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    margin-bottom: 3rem;

    img {
      min-width: 0;
      height: 250px;
      width: 80%;
    }
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
    align-items: center;
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
    padding: 30px 0;
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
    margin-bottom: 20px;

    p {
      font-size: 13px;
      margin-bottom: 12px;
    }
    .quantity_box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item_price {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }

  .buy_cart {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  @media screen and (max-width: 900px) {
    padding: 0 30px 0 0;
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    padding: 0;
    .buy_titlebox > .buy_title {
      font-size: 20px;
      font-weight: 600;
    }
    .buy_count > .quantity_box > .item_price {
      font-size: 20px;
      font-weight: 700;
    }
    .buy_price {
      > .buy_item_content {
        font-size: 14px;
      }
      .buy_price_text {
        font-size: 16px;
      }
    }
  }
`;

const AlcoholItemBuy = ({ data }: ItemDatailProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);

  const currentDate: Date = new Date();
  const currentDateNum: number = Math.floor(currentDate.getTime() / 1000);

  const expDataNum: number | null = Number(localStorage.getItem("exp"));

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const navigate = useNavigate();

  const HandlerClickCart = async () => {
    if (expDataNum && expDataNum > currentDateNum) {
      await createItemCart(data.itemId, quantity);
      setIsModal(true);
    } else {
      navigate("/login");
    }
  };

  const HandlerClickOrder = (): void => {
    const items: ItemOrder = {
      itemId: data.itemId,
      titleKor: data.titleKor,
      price: data.price * quantity,
      profile: data.profile,
      quantity,
    };
    navigate("/payment", {
      state: { items: [items] },
    });
  };
  const HandlerCart = (): void => {
    navigate("/cart");
  };

  return (
    <>
      <AlcoholItemBuyContainer>
        <StyledItemImgBox>
          <img src={`${data.profile}?${new Date().getTime()}`} />
        </StyledItemImgBox>
        <StyledItemBuyBox>
          <div className="buy_titlebox">
            <p className="buy_title">{data.titleKor}</p>
            <div className="item_like">
              <ClickFavoriteItem
                itemId={data.itemId}
                icon={AiFillHeart}
                color="#e4e5e9"
                activeColor="#D43635"
                size={30}
              />
            </div>
          </div>
          <div className="buy_price">
            <div className="buy_item_content">
              <span className="buy_item_content_title">판매가</span>
              <span className="buy_price_text">
                <PriceDisplay price={data.price} />원
              </span>
            </div>
            <div className="buy_item_content">
              <span className="buy_item_content_title">용량</span>
              <span>{data.capacity}ml</span>
            </div>
          </div>
          <div className="buy_count">
            <p>현재 남은 수량 중 최대 {data.quantity}개 구매 가능</p>
            <div className="quantity_box">
              <QuantityControl
                quantity={quantity}
                maxQuantity={data.quantity}
                onQuantityChange={handleQuantityChange}
              />
              <div className="item_price">
                <PriceDisplay price={data.price * quantity} />원
              </div>
            </div>
          </div>
          <div className="buy_cart">
            <ButtonLight width="100%" height="100%" fontSize="14px" fontWeight="500" onClick={HandlerClickCart}>
              장바구니
            </ButtonLight>
            <ButtonDark width="100%" height="100%" fontSize="14px" fontWeight="500" onClick={HandlerClickOrder}>
              구매하기
            </ButtonDark>
          </div>
        </StyledItemBuyBox>
      </AlcoholItemBuyContainer>
      {isModal && (
        <Alert text="장바구니로 이동하시겠습니까?" onClickCancel={() => setIsModal(false)} onClickOk={HandlerCart} />
      )}
    </>
  );
};

export default AlcoholItemBuy;
