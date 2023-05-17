import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Progress from "./Progress";

const PaymentConfirmContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  & h2 {
    font-size: 48px;
    font-weight: bold;
  }

  & div.main {
    width: 100%;
    ${({ theme }) => theme.common.flexCenterCol};
  }
  & div.reason {
    height: 100px;
    font-size: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PaymentConfirm = () => {
  const [searchParams] = useSearchParams();
  return (
    <PaymentConfirmContainer>
      <h2>결제 성공</h2>
      <div className="main">
        <Progress />
        <div className="reason">{`주문 아이디: ${searchParams.get("orderId")}`}</div>
        <div className="reason">{`주문 목록: ${searchParams.get("orderName")}`}</div>
        <div className="reason">{`구매자 : ${searchParams.get("customerName")}`}</div>
        <div className="reason">{`구매자 E-Mail : ${searchParams.get("customerEmail")}`}</div>
        <div className="reason">{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</div>
      </div>
    </PaymentConfirmContainer>
  );
};

export default PaymentConfirm;
