import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Progress from "./Progress";
import PaymnetUserInfo from "./PaymentUserinfo";
import Itemlist from "./Paymentitemlist";
import Payinfo from "./Paymentpayinfo";
import { UserProps } from "types/AlcholInterfaces";
import useAxiosAll from "@hooks/useAxiosAll";
import { useSelector } from "react-redux";
import { stateProps } from "./Paymentpayinfo";
import Modal from "@layout/Header/Logoutmodal";
const Payment = () => {
  const location = useLocation();
  const items = location.state ? location.state.items : [];
  const navigate = useNavigate();
  const [doAxios, data] = useAxiosAll();
  const selectdata = useSelector((state: stateProps) => state.markerState);
  const [userInfo, setUserInfo] = useState<UserProps>({} as UserProps);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateUserInfo = () => {
    setUserInfo(data as UserProps);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    doAxios("get", "/members", {}, true);
  }, []);

  useEffect(() => {
    if (data) {
      updateUserInfo();
    }
  }, [data]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handlePayment = () => {
    if (!selectedDate || !selectdata || !items) {
      return setIsModalOpen(true);
    }
    navigate("/CheckoutChang", { state: { items: items, userInfo: userInfo } });
  };

  const handleDateChange = (date: Date | null) => {
    const today = new Date();
    if (date && date < today) {
      setIsModalOpen(true);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <PaymentContainer>
      <h2 className="payment"></h2>
      <div className="main">
        <Progress />
        <PaymnetUserInfo userInfo={userInfo} updateUserInfo={updateUserInfo} />
        <Itemlist />
        <Payinfo onDateChange={handleDateChange} />
        <div className="button">
          <div className="buttonDetail">
            <ButtonLight width="160px" height="60px" fontSize="18px" onClick={() => navigate(-1)}>
              뒤로가기
            </ButtonLight>
          </div>
          <div className="buttonDetail">
            <ButtonDark width="160px" height="60px" fontSize="18px" onClick={handlePayment}>
              결제하기
            </ButtonDark>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal">날짜 및 픽업 장소를 입력해 주세요</div>
        </Modal>
      )}
    </PaymentContainer>
  );
};

export default Payment;

const PaymentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  .button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 150px;
    width: 25%;
    padding-bottom: 200px;
  }

  .buttonDetail {
    width: 150px;
    padding-top: 50px;
    border: none;
  }

  & h2 {
    font-size: 48px;
    font-weight: bold;
  }

  & div.main {
    width: 100%;
    ${({ theme }) => theme.common.flexCenterCol};
  }
`;
