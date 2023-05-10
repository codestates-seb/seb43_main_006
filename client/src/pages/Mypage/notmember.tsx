//회원탈퇴페이지

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NomemberContainer = styled.div`
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
  // border: 3px solid #f7f7f7;
  border: 3px solid black;
  width: 250px;
  height: 600px;
  margin-right: 80px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  // justify-content: flex-start;
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

  /* >p: first-child {
    margin-top: 70px;
    margin-bottom: 40px;
  } */
`;
const NomemberStyled = styled.section`
  border: 3px solid blue;
  // width: 950px;
  height: 700px;
  display: flex;
  flex-direction: column;
  padding-left: 200px;
  padding-right: 200px;
  padding-top: 150px;
  padding-bottom: 150px;

  > input {
    margin-bottom: 30px;
  }

  > button {
    margin-top: 30px;
  }
`;

const ModalBtn = styled.button`
  background-color: green;
`;
const ModalBackdrop = styled.div`
  background-color: blue;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const ModalView = styled.div`
  background-color: orange;
  width: 600px;
  height: 300px;
  position: fixed;
  /* transform: translateY(-100px);
  transform: translateX(-200px); */
  transform: translateY(-200px);
  transform: translateX(-300px);
  left: 50%;
  top: 35%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false); //false를 모달 닫힌걸로 생각함.
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    console.log("메롱");
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>확인 </ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(event) => event.stopPropagation()}>
              <h1>yes</h1>
              <h1>no</h1>
              <button onClick={openModalHandler}>X</button>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

const Notmember: React.FC = () => {
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);

  // const openModalHandler = () => {
  //   setIsOpen(!isOpen);
  //   console.log("메롱");
  // };

  return (
    <>
      <TotalStyled>
        <NomemberContainer>
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
            <NomemberStyled>
              Email<input></input>
              Password<input></input>
              <p>탈퇴시 정보가 삭제되며, 복원할 수 없습니다.</p>
              {/* <button onClick={openModalHandler}>확 인</button> */}
              {/* <ModalContainer> */}
              {/* <ModalBtn onClick={openModalHandler}>확인</ModalBtn> */}
              {/* <button onClick={openModalHandler}>확인</button> */}
              {/* <ModalContainer>
                {isOpen ? (
                  <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                      <h1>yes</h1>
                      <h1>no</h1>
                      <button onClick={openModalHandler}>X</button>
                    </ModalView>
                  </ModalBackdrop>
                ) : null}
              </ModalContainer> */}
              <Modal></Modal>
            </NomemberStyled>
          </section>
        </NomemberContainer>
      </TotalStyled>
    </>
  );
};

export default Notmember;
