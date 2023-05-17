import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const PaymentConfirmContainer = styled.section`
  padding-top: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h1 {
    height: 200px;
    font-size: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div.reason {
    height: 200px;
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
      <div>
        <h1>결제 성공</h1>
        <div className="reason">{`주문 아이디: ${searchParams.get("orderId")}`}</div>
        <div className="reason">{`결제 금액: ${Number(searchParams.get("totalPrice")).toLocaleString()}원`}</div>
      </div>
    </PaymentConfirmContainer>
  );
};

export default PaymentConfirm;
