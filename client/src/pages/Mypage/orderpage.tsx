//주문페이지

import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // justify-content: space-between;
  max-width: 1250px;
  // margin-left: 95px;
  // margin-right: 95px;
  width: 100vw;
  height: 100vh;
  border: 10px solid black;
`;

const MypageMenuStyled = styled.nav`
  border: 3px solid black;
  width: 250px;
  height: 600px;
  margin-right: 80px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const TotalOrderStyled = styled.div`
  border: 3px solid black;
  text-align: right;
  width: 600px;
`;
const OrderlistStyled = styled.section`
  border: 3px solid blue;

  height: 700px;
`;
const OrderEachListStyled = styled.div`
  border: 1px solid red;
  flex-grow: 1;
  height: 350px;
`;

const Orderpage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <TotalStyled>
        <OrderContainer>
          <nav>
            <MypageMenuStyled>
              <p>mypagemenu</p>
              <p>찐영이야님</p>
              <button onClick={() => navigate("/mypage/likepage")}>찜 6</button>
              <button onClick={() => navigate("/mypage/orderpage")}>주문 2</button>
              <p>지난구매내역</p>
              <p>개인정보수정</p>
              <p>회원탈퇴</p>
            </MypageMenuStyled>
          </nav>
          <section>
            <TotalOrderStyled>총 2개</TotalOrderStyled>
            <OrderlistStyled>
              <OrderEachListStyled>1</OrderEachListStyled>
              <OrderEachListStyled>2</OrderEachListStyled>
            </OrderlistStyled>
          </section>
        </OrderContainer>
      </TotalStyled>
    </>
  );
};

export default Orderpage;
