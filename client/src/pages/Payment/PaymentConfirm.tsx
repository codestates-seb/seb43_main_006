import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Progress from "./Progress";
import axios from "axios";
import useAxiosAll from "@hooks/useAxiosAll";

type UserdataType = {
  memberId: string;
  displayName: string;
  realName: string;
  phone: string;
  email: string;
};

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
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  const paymentKey = urlParams.get("paymentKey");
  const amount = Number(urlParams.get("amount"));
  const [orderlist, setOrderlist] = useState();
  const [userdata, setUserdata] = useState<UserdataType | null>(null);
  const [doAxios, data] = useAxiosAll();

  useEffect(() => {
    if ("realName" in data && "email" in data && "phone" in data) {
      const formData = {
        realName: data.realName,
        phone: data.phone,
        email: data.email,
      };
      data as UserdataType;
      setUserdata(formData as UserdataType);
    }
  }, [data]);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}/payment`,
      // `http://ec2-3-39-189-208.ap-northeast-2.compute.amazonaws.com:8080/payment`,
      { orderId, paymentKey, amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  const access_token = `Bearer ${localStorage.getItem("authToken")}`;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/to-payment`, {
        // .get(`http://ec2-3-39-189-208.ap-northeast-2.compute.amazonaws.com:8080/to-payment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        setOrderlist(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}/order`,
      // `  http://ec2-3-39-189-208.ap-northeast-2.compute.amazonaws.com:8080/orders`,
      { orderlist },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PaymentConfirmContainer>
      <h2>결제 성공</h2>
      <div className="main">
        <Progress />
        <div className="reason">{`주문 아이디: ${orderId}`}</div>
        <div className="reason">{`주문 목록: ${String(searchParams.get("orderName"))}`}</div>
        <div className="reason">{`구매자 : ${String(searchParams.get("customerName"))}`}</div>
        <div className="reason">{`구매자 E-Mail : ${searchParams.get("transactionAt")}`}</div>
        <div className="reason">{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</div>
      </div>
    </PaymentConfirmContainer>
  );
};

export default PaymentConfirm;
