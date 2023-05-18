import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ButtonDark, ButtonLight } from "../../components/Common/Button";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Progress from "./Progress";
import PaymnetUserInfo from "./PaymentUserinfo";
import Itemlist from "./Paymentitemlist";
import Payinfo from "./Paymentpayinfo";
import { UserProps } from "../../types/AlcholInterfaces";

const Payment = () => {
  const location = useLocation();
  const items = location.state ? location.state.items : [];
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserProps>({
    id: "84",
    name: "양선우",
    email: "sunwoo020@naver.com",
    phoneNumber: "010-1234-5678",
  });

  const updateUserInfo = (user: UserProps) => {
    setUserInfo(user);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/payment`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage.getItem("authToken"),
  //         "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
  //       },
  //     })

  //     .then((res) => {
  //       // console.log(res);
  //       console.log(res.data.data);
  //       setUser(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // const handlePayment = () => {
  //   navigate("/checkout", { state: { items: items, user: userInfo } });
  // };
  const handlePayment = () => {
    navigate("/CheckoutChang", { state: { items: items, user: userInfo } });
  };

  return (
    <PaymentContainer>
      <h2 className="payment">결제 페이지</h2>
      <div className="main">
        <Progress />
        <PaymnetUserInfo userInfo={userInfo} updateUserInfo={updateUserInfo} />
        <Itemlist />
        <Payinfo />
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
    width: 30%;
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
