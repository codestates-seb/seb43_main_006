//마이페이지의 첫화면, 찜화면이다.

//grid 활용하는거 생각해보기!!!!

import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LikepageContainer = styled.div`
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
const LikelistStyled = styled.section`
  border: 3px solid blue;
  // width: 950px;
  height: 700px;
  display: flex;
  flex-wrap: wrap;
`;

const EachListStyled = styled.div`
  border: 1px solid red;
  flex-grow: 1;
  width: 300px;
`;

const Likepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <TotalStyled>
        <LikepageContainer>
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
            <LikelistStyled>
              <EachListStyled>1</EachListStyled>
              <EachListStyled>2</EachListStyled>
              <EachListStyled>3</EachListStyled>
              <EachListStyled>4</EachListStyled>
              <EachListStyled>5</EachListStyled>
              <EachListStyled>6</EachListStyled>
            </LikelistStyled>
          </section>
        </LikepageContainer>
      </TotalStyled>
    </>
  );
};

export default Likepage;
