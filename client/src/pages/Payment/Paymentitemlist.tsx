import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ItemOrder } from "../../types/AlcholInterfaces";

export default function Itemlist() {
  const location = useLocation();
  const items = location.state ? location.state.items : [];
  return (
    <IItemlist>
      <div className="list">
        <div className="title2">
          <div>구매 정보</div>
        </div>
        <div className="listtitle">
          <div className="imglisttitle">제품 이미지</div>
          <div className="infotitle">제품명</div>
          <div className="eachtitle">개수</div>
          <div className="pricetitle">가격</div>
        </div>
        {items.map((item: ItemOrder) => (
          <div key={item.itemId} className="cartitem">
            <div className="imglist">
              <img src={item.profile} alt={item.titleKor} />
            </div>
            <div className="info">{item.titleKor}</div>
            <div className="eachtag"> </div>
            <div className="each">{item.quantity}</div>
            <div className="price">{item.price.toLocaleString()} 원</div>
          </div>
        ))}
      </div>
    </IItemlist>
  );
}

const IItemlist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterCol};

  & div.list {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3%;
    padding-right: 3%;
    width: 90%;
    margin-top: 50px;
  }
  & div.title2 {
    font-size: 30px;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 3%;
    padding-top: 5%;
    width: 100%;
    padding-left: 3.7%;
  }
  & div.listtitle {
    display: flex;
    align-items: center;
    width: 85%;
    height: 30px;

    border-bottom: 1px solid rgba(60, 60, 60, 0.1);
  }

  & div.imglisttitle {
    width: 20%;
    padding-left: 4%;
    ${({ theme }) => theme.common.flexCenter};
  }
  & div.infotitle {
    width: 100%;
    padding-left: 3%;
    ${({ theme }) => theme.common.flexCenter};
  }

  & div.eachtitle {
    width: 14%;
    padding-left: 2%;
    ${({ theme }) => theme.common.flexCenter};
  }

  & div.pricetitle {
    width: 16%;
    ${({ theme }) => theme.common.flexCenter};
  }

  & div.cartitem {
    ${({ theme }) => theme.common.flexCenterRow};
    width: 85%;
    font-size: 15px;
    border-bottom: 1px solid rgba(60, 60, 60, 0.1);

    & div.imglist {
      width: 20%;
      height: 150px;
      ${({ theme }) => theme.common.flexCenter};

      & img {
        width: 250px;
        height: 90%;
        object-fit: contain;
      }
    }
    & div.info {
      width: 100%;
      height: 100%;
      ${({ theme }) => theme.common.flexCenter};
      font-size: 16px;
      // 나중에 수정할 사항
    }

    & div.each {
      width: 22%;
      height: 100%;
      ${({ theme }) => theme.common.flexCenter};
    }

    & div.price {
      width: 12%;
      height: 100% ${({ theme }) => theme.common.flexCenter};
    }
  }
`;
