import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChangeContainer = styled.div`
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
  background-color: #f7f7f7;
  > * {
    margin-top: 20px;
    font-size: 20px;
    text-align: center;
  }
  > button {
    height: 52px;
    border-radius: 7px;
    width: 80%;
    background-color: #d9d9d9;
    opacity: 0.35;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InfoMemoStyled = styled.div`
  border: 3px solid blue;

  height: 750px;
  display: flex;
  flex-direction: column;
`;

const Infochange: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <TotalStyled>
        <ChangeContainer>
          <nav>
            <MypageMenuStyled>
              <p>찐영이야님</p>
              <button onClick={() => navigate("/mypage/likepage")}>찜 6</button>
              <button onClick={() => navigate("/mypage/orderpage")}>주문 2</button>
              <p>지난구매내역</p>
              <p>개인정보수정</p>
              <p>회원탈퇴</p>
            </MypageMenuStyled>
          </nav>
          <section>
            <InfoMemoStyled>
              이름<input></input>
              별명<input></input>
              생년월일<input></input>
              번호<input></input>
              Email<input></input>
              Password<input></input>
              <input></input>
              <button>수 정</button>
            </InfoMemoStyled>
          </section>
        </ChangeContainer>
      </TotalStyled>
    </>
  );
};

export default Infochange;
