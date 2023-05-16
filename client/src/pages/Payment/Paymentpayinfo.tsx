import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ItemOrder } from "../../types/AlcholInterfaces";
import DatePicker from "react-datepicker";
import { useState } from "react";

export default function Payinfo() {
  const location = useLocation();
  const items = location.state ? location.state.items : [];

  const { totalquantity, totalPrice } = items.reduce(
    (acc: { totalquantity: number; totalPrice: number }, item: ItemOrder) => {
      acc.totalquantity += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalquantity: 0, totalPrice: 0 },
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePickDateClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <Payinfostyle>
      <div className="title3">
        <div>결제 정보</div>
      </div>
      <div className="mainpay">
        <div className="paylist">
          <div className="firstline">
            <div className="totalQ">
              <div className="tq">총 개수 </div>
              <div className="totalQuantity">{totalquantity.toLocaleString()} 개</div>
            </div>
            <div className="totalP">
              <div className="tp">총 결제 금액 </div>
              <div className="totalprice"> {totalPrice.toLocaleString()} 원</div>
            </div>
          </div>
        </div>
        <div className="secondline">
          <div className="pickupdate">픽업 예정 날짜</div>
          <div className="pickdate">{selectedDate?.toLocaleDateString() || "날짜를 선택해주세요."}</div>
          <div className="pickselect" onClick={handlePickDateClick}>
            픽업 예정 날짜 선택
          </div>
          {isCalendarOpen && <DatePicker selected={selectedDate} onChange={handleDateChange} inline />}
        </div>

        <div>
          <div className="thirdline">
            <div className="place">
              <div className="pickupplace">픽업 예정 위치</div>
              <div className="placeinfo">
                <div className="place1">
                  <div className="placename">가게 이름</div>
                  <div className="placename2">좋은데이</div>
                </div>
                <div className="place2">
                  <div className="placeadd">도로명 주소</div>
                  <div className="placeadd2">경기도 사랑시 고백구 행복동 48-85</div>
                </div>
                <div className="place3">
                  <div className="placenumber">가게 번호</div>
                  <div className="placenumber2">010-1234-5678</div>
                </div>
              </div>
            </div>
            <div className="map">
              <div>지도</div>
            </div>
          </div>
        </div>
      </div>
    </Payinfostyle>
  );
}

const Payinfostyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterCol};

  & div.title3 {
    font-size: 30px;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 3%;
    padding-top: 5%;
    width: 100%;
    padding-left: 11%;
  }

  & div.mainpay {
    width: 80%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    display: flex;
    font-size: 16px;
  }

  & div.paylist {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }

  & div.firstline {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
  }
  & div.totalQ {
    display: flex;
    align-items: center;
    width: 40%;
    display: flex;
    height: 50px;
  }

  & div.totalP {
    display: flex;
    align-items: center;
    width: 60%;
    display: flex;
    height: 50px;
  }
  & div.tq {
    ${({ theme }) => theme.common.flexCenter};
    width: 40%;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    max-width: 180px;
    font-weight: bold;
    min-width: 161px;
  }
  & div.totalQuantity {
    width: 75%;
    display: flex;
    ${({ theme }) => theme.common.flexCenter};
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.tp {
    ${({ theme }) => theme.common.flexCenter};
    width: 40%;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }

  & div.totalprice {
    width: 60%;
    display: flex;
    ${({ theme }) => theme.common.flexCenter};
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }

  & div.secondline {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }

  & div.pickupdate {
    ${({ theme }) => theme.common.flexCenter};
    width: 17.4%;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
    min-width: 162px;
  }
  & div.pickdate {
    width: 100%;
    ${({ theme }) => theme.common.flexCenter};
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-size: 16px;

    &::placeholder {
      color: #c3c3c3;
    }

    &:focus {
      outline: none;
    }
  }
  & div.pickselect {
    ${({ theme }) => theme.common.flexCenter};
    width: 30%;
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-size: 14px;
  }

  & div.thirdline {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 700px;
    width: 100%;
  }
  & div.place {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35%;
    height: 100%;
  }
  & div.pickupplace {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100%;
    min-width: 162px;
    max-width: 181px;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }

  & div.placeinfo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    height: 100%;
  }

  & div.place1 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  & div.placename {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placename2 {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.place2 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  & div.placeadd {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placeadd2 {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.place3 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  & div.placenumber {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placenumber2 {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }

  & div.map {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
`;
