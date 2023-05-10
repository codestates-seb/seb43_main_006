//지난구매내역페이지

import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuyendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  // margin-left: 95px;
  // margin-right: 95px;
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
const TotalBuyStyled = styled.div`
  border: 3px solid black;
  text-align: right;
  width: 600px;
`;
const BuyStyled = styled.section`
  border: 3px solid blue;

  height: 700px;
`;

const Buyend: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <TotalStyled>
        <BuyendContainer>
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
            <TotalBuyStyled>총 2개</TotalBuyStyled>
            <BuyStyled>list</BuyStyled>
          </section>
        </BuyendContainer>
      </TotalStyled>
    </>
  );
};

export default Buyend;