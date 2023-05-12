//개인정보수정 페이지이다.  회원탈퇴기능 안에 포함되어있음.

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const InfoContainer = styled.div`
  /* border: 5px solid black; */
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  > p {
    margin-left: 30px;
    font-size: 18px;
  }
`;

//테이블 전체부분
const InfoBodyupStyled = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  > input {
    /* width: 226px; */
    background-color: red;
  }
`;
//테이블밑의 버튼들 전체부분
const InfoBodydownStyled = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 300px;
  margin-top: 30px;
`;

//정보수정버튼
const ChangebtnStyled = styled.button`
  background-color: #222222;
  height: 52px;
  width: 350px;
  color: whitesmoke;
  font-size: 20px;
  border-radius: 7px;
`;

//테이블부분 따로준거, 딱테이블부분!
const StyledTable = styled.table`
  border: 2px solid #dedede;
  width: 800px;
  height: 650px;
  text-align: center;
  /* vertical-align: middle; */
  font-size: 16px;
  /* margin-left: 100px; */
`;
const StyledTd = styled.td`
  border: 1px solid black;
  vertical-align: middle;
`;
const StyledTh = styled.th`
  border: 1px solid black;
  vertical-align: middle;
  text-align: left;
  padding-left: 20px;
  font-weight: 600;
`;
const InfoTable = () => {
  return (
    <>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTh>이름</StyledTh>
            <StyledTd>홍길동</StyledTd>
          </tr>
          <tr>
            <StyledTh>닉네임</StyledTh>
            <StyledTd>
              <input type="text"></input>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>생년월일</StyledTh>
            <StyledTd>1900-03-03</StyledTd>
          </tr>
          <tr>
            <StyledTh>휴대폰번호</StyledTh>
            <StyledTd>
              <input type="tel"></input>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>이메일</StyledTh>
            <StyledTd>abc@naver.com</StyledTd>
          </tr>
          <tr>
            <StyledTh>비밀번호</StyledTh>
            <StyledTd>
              <input type="password" placeholder="비밀번호를 입력하세요"></input>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>비밀번호확인</StyledTh>
            <StyledTd>
              <input type="password" placeholder="비밀번호를 입력하세요"></input>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};
/*------------------모달관련부분------------------------------*/
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
const ModalBtn = styled.button`
  //회원탈퇴버튼
  background-color: #f7f7f7;
  height: 52px;
  width: 120px;
  border-radius: 7px;
  border: 1px solid #181818;
  font-size: 20px;
  font-weight: 350;
  margin-right: 40px;
`;
//모달뜰때 뒤배경
const ModalBackdrop = styled.div`
  background-color: whitesmoke;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
//회원탈퇴클릭시 뜨는 모달창
const ModalView = styled.div`
  background-color: #dedede;
  border-radius: 7px;
  width: 600px;
  height: 300px;
  position: fixed;
  /* transform: translateY(-100px);
  transform: translateX(-200px); */
  transform: translateY(-200px);
  transform: translateX(-300px);
  left: 50%;
  top: 35%;
  //display: flex;
  // flex-direction: column;
  // justify-content: center;
  /* > p {
    border: 2px solid black;
    top: 50%;
  } */
  text-align: center;
  padding-top: 50px;
  > p {
    font-size: 28px;
    font-weight: 700;
    display: block;
  }
`;

//모달창에 있는 yes, no버튼들
const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  /* margin-left: 180px; */
  /* margin-left: 30%; */
  gap: 70px;
  cursor: pointer;
  /* background-color: #222222; */
`;

//모달창열렸을때 X버튼
const WindowCloseBtn = styled.div`
  /* border: 2px solid blue; */
  float: right;
  margin-right: 10px;
  cursor: pointer;
`;

const ModalCloseBtn = styled.div`
  border: 2px solid #181818;
  height: 52px;
  width: 80px;
  border-radius: 7px;
  /* display: flex;
  flex-direction: row; */
  line-height: 100%;
  font-size: 20px;
  padding-top: 10px;
  color: #181818;
  font-weight: 700;
  cursor: pointer;
`;

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false); //false를 모달 닫힌걸로 생각함.
  const navigate = useNavigate();
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>회원탈퇴</ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(event) => event.stopPropagation()}>
              <WindowCloseBtn onClick={openModalHandler}>X</WindowCloseBtn>
              <p>정말로 탈퇴하시겠습니까?</p>
              <CloseBtn>
                <ModalCloseBtn>YES</ModalCloseBtn>
                <ModalCloseBtn onClick={() => navigate("/mypage/likepage")}>NO</ModalCloseBtn>
              </CloseBtn>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
/*-------------------------------여기위까지모달-------------------------------------------*/
const Changeinfopage: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <>
      <TotalStyled>
        <InfoContainer>
          <p>회원정보수정</p>
          <InfoBodyupStyled>
            <InfoTable></InfoTable>
          </InfoBodyupStyled>
          <InfoBodydownStyled>
            <ChangebtnStyled>정보 수정</ChangebtnStyled>
            <Modal></Modal>
          </InfoBodydownStyled>
        </InfoContainer>
      </TotalStyled>
    </>
  );
};

export default Changeinfopage;
