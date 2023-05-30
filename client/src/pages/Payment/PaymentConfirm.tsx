import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import Progress from "./Progress";
import axios from "axios";
import { ButtonLight } from "@components/Common/Button";
import { useSelector } from "react-redux";
import { Itemtype } from "@pages/Cart";

type DateProps = {
  dateState: {
    Date: Date | null;
  };
};

type Datatype = {
  cartId: string;
  itemCarts: [Itemtype];
};

const PaymentConfirmContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  & h2 {
    font-size: 24px;
    font-weight: bold;
  }

  & div.main {
    width: 100%;
    ${({ theme }) => theme.common.flexCenterCol};
  }

  & div.reason {
    margin-top: 100px;
    height: 100px;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div.button {
    margin-top: 100px;
  }
`;

function authTokenExpired(authToken: string) {
  if (!authToken) {
    // authToken is missing
    return true; // treat as expired
  }

  // authToken is present
  const decodedToken = decodeAuthToken(authToken);
  const expSeconds = decodedToken.exp;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return expSeconds < nowSeconds; // true if expired, false if valid
}

function decodeAuthToken(authToken: string) {
  // Implement the logic to decode the authToken
  // You can use a JWT decoding library or your own implementation
  const payload = authToken.split(".")[1];
  const decodedPayload = atob(payload);
  const { exp } = JSON.parse(decodedPayload);
  return { exp };
}

const PaymentConfirm = () => {
  const [searchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  const paymentKey = urlParams.get("paymentKey");
  const amount = Number(urlParams.get("amount"));
  const navigate = useNavigate();
  const [itemOrders, setItemOrders] = useState<{ itemId: number; quantity: number }[]>([]);
  const [itemCartdelete, setItemCartdelete] = useState<{ itemId: number }[]>([]);
  const pickupDate = useSelector((state: DateProps) => {
    const date = state.dateState.Date;
    if (date) {
      const formattedDate = date.toISOString().substring(0, 10);
      return formattedDate;
    }
    return null;
  });

  console.log(pickupDate);
  // itemlist의 itemCarts 배열을 순회하면서 itemId와 quantity를 추출하여 itemOrders에 추가합니다.

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    // Check if the authToken is missing or expired
    if (!authToken || authTokenExpired(authToken)) {
      navigate("/login");
      return;
    }
  });

  const fetchData = async () => {
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        const data: Datatype = response.data.data; // 받아온 데이터
        const itemOrders = data.itemCarts.map(({ itemId, quantity }) => ({ itemId, quantity }));
        setItemOrders(itemOrders);
        const itemCartdelete = data.itemCarts.map(({ itemId }) => ({ itemId }));
        setItemCartdelete(itemCartdelete);
      })

      .catch((err) => {
        console.log(err);
      });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/payment`,
        { orderId, paymentKey, amount },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        },
      );
    } catch (err) {
      console.log(err);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (itemOrders.length > 0) {
      const access_token = `Bearer ${localStorage.getItem("authToken")}`;
      try {
        const body = {
          itemOrders: itemOrders,
          pickupDate: pickupDate,
        };
        axios.post(`${process.env.REACT_APP_API_URL}/order`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
            "ngrok-skip-browser-warning": "69420",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [itemOrders]);

  useEffect(() => {
    const itemIds = itemCartdelete.map((item) => item.itemId);
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
    try {
      axios.delete(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
        data: { itemIds },
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <PaymentConfirmContainer>
      <h2></h2>
      <div className="main">
        <Progress />
        <div className="reason">{`주문 아이디: ${orderId}`}</div>
        <div className="reason">{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</div>
        <div className="button">
          <ButtonLight width="160px" height="60px" fontSize="18px" onClick={() => navigate("/")}>
            홈으로
          </ButtonLight>
        </div>
      </div>
    </PaymentConfirmContainer>
  );
};

export default PaymentConfirm;
