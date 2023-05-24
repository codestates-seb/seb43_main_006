import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemOrder } from "../../types/AlcholInterfaces";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import Place from "@pages/Place";
import { useDispatch } from "react-redux";
import { setDate } from "../../redux/slice/store";
import Modal from "@layout/Header/Logoutmodal";

export type stateProps = {
  loginState?: string;
  markerState?: {
    address: string;
    choice: boolean;
    comment: string;
    lat: number;
    lng: number;
    marketId: number;
    name: string;
    phone: string;
    workTime: string;
  };
};

export interface PayinfoProps {
  onDateChange: (date: Date | null) => void;
}

export default function Payinfo({ onDateChange }: PayinfoProps) {
  const location = useLocation();
  const items = location.state ? location.state.items : [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const selectdata = useSelector((state: stateProps) => state.markerState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePickDateClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date: Date | null) => {
    const today = new Date();
    if (date && date < today) {
      setIsModalOpen(true);
    } else {
      setSelectedDate(date);
      setIsCalendarOpen(false);
      onDateChange(date);
      dispatch(setDate(date ? date.getTime() : null));
    }
  };

  const handlemapClick = () => {
    navigate("/place", { state: { items: items } });
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

        <div>
          <div className="thirdline">
            <div className="place">
              <div className="pickupplace">픽업 정보</div>
              <div className="placeinfo">
                <div className="place1">
                  <div className="placename">가게 이름</div>
                  <div className="placename2">{selectdata?.name}</div>
                </div>
                <div className="place2">
                  <div className="placeadd">도로명 주소</div>
                  <div className="placeadd2">{selectdata?.address}</div>
                </div>
                <div className="place3">
                  <div className="placenumber">가게 번호</div>
                  <div className="placenumber2">{selectdata?.phone}</div>
                </div>
                <div className="place4">
                  <div className="placecomment">가게 정보</div>
                  <div className="placecomment2">
                    <div>{selectdata?.comment}</div>
                    <div>{selectdata?.workTime}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="map" onClick={handlemapClick}>
              <Place />
            </div>
          </div>
          <div className="secondline">
            <div className="pickupdate">픽업 예정 날짜</div>
            <div className="pickdate">{selectedDate ? selectedDate.toLocaleDateString() : "날짜를 선택해주세요."}</div>
            {isCalendarOpen ? (
              <div className="pickselect3">
                {isCalendarOpen && <DatePicker selected={selectedDate} onChange={handleDateChange} inline />}
              </div>
            ) : (
              <div className="pickselect">
                <div className="pickselect2" onClick={handlePickDateClick}>
                  픽업 예정 날짜 선택
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal">날짜를 오늘 이후로 해주세요</div>
        </Modal>
      )}
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
    width: 70%;
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
    width: 180px;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    max-width: 180px;
    font-weight: bold;
    min-width: 161px;
  }
  & div.totalQuantity {
    width: 441px;
    display: flex;
    ${({ theme }) => theme.common.flexCenter};
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.tp {
    ${({ theme }) => theme.common.flexCenter};
    width: 322px;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }

  & div.totalprice {
    width: 483px;
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
    width: 180px;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
    min-width: 162px;
  }
  & div.pickdate {
    width: 1040px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 270px;
    height: 100%;
    border: 1px solid rgba(60, 60, 60, 0.5);
    font-size: 14px;
    &:hover {
      cursor: pointer;
    }
  }
  & div.pickselect2 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div.pickselect3 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 100px;
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
    width: 30%;
    height: 100%;
  }
  & div.pickupplace {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
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
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placename2 {
    width: 100%;
    height: 70%;
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
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placeadd2 {
    width: 100%;
    height: 70%;
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
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placenumber2 {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }

  & div.place4 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  & div.placecomment {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.5);
    border: 1px solid rgba(60, 60, 60, 0.1);
    font-weight: bold;
  }
  & div.placecomment2 {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.map {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 50%;
    border: 1px solid rgba(60, 60, 60, 0.1);
    & section {
      width: 100%;
      max-height: 600px;
      margin-top: 10px;
      overflow: hidden;
    }
  }
  & div.calender {
    display: flex;
  }
`;
