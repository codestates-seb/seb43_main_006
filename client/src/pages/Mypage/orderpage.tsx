//주문페이지

import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const OrderContainer = styled.div`
  /* border: 5px solid blue; */
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  display: flex;
  flex-direction: column;
`;

//누구누구님 등급써있는부분
const OrderpageHeadStyled = styled.div`
  /* border: 3px solid black; */
  flex-grow: 1;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #dedede;
  > p {
    margin-left: 10px;
    margin-bottom: 10px;
    color: #181818;
    font-weight: 600;
  }
`;

//주문내역써있는부분
const OrderpageMainStyled = styled.div`
  flex-grow: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 10px;
`;

//기간설정하는 부분
const PeriodStyled = styled.div`
  border: 1px solid #222222;
  height: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  justify-content: center;
  /* justify-content: flex-start; */
  align-items: center;
  margin-left: 170px;
  margin-right: 170px;
  > * {
    margin-left: 20px;
  }
  > input {
    height: 30px;
    width: 250px;
  }
  > button {
    height: 52px;
    width: 120px;
    border-radius: 7px;
    background-color: #222222;
    color: whitesmoke;
    /* font-weight: 600; */
    font-size: 20px;
  }
  > p {
    font-weight: 600;
  }
`;

//목록부분
const OrderlistStyled = styled.div`
  /* border: 3px solid black; */
  height: 30px;
  flex-grow: 4;
  margin-top: 10px;
  > p {
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const StyledTable = styled.table`
  border: 1px solid black;
  width: 1240px;
  height: 300px;
  font-size: 18px;
`;

const StyledTh = styled.th`
  border: 1px solid black;
  padding: 8px;
  font-weight: 600;
`;

const StyledTd = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
`;

const OrderTable = () => {
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>날짜</StyledTh>
            <StyledTh>구매목록</StyledTh>
            <StyledTh>수량</StyledTh>
            <StyledTh>가격</StyledTh>
            <StyledTh>상태</StyledTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTd>2023-03-31</StyledTd>
            <StyledTd>앱솔루트</StyledTd>
            <StyledTd>10</StyledTd>
            <StyledTd>20,000</StyledTd>
            <StyledTd>픽업완료</StyledTd>
          </tr>
          <tr>
            <StyledTd>2023-04-01</StyledTd>
            <StyledTd>앱솔루트</StyledTd>
            <StyledTd>2</StyledTd>
            <StyledTd>20,000</StyledTd>
            <StyledTd>주문완료</StyledTd>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};
const Orderpage: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <>
      <TotalStyled>
        <OrderContainer>
          <OrderpageHeadStyled>
            <p>찐영이야님의 등급은 Green입니다.</p>
          </OrderpageHeadStyled>
          <OrderpageMainStyled>주문내역</OrderpageMainStyled>
          <PeriodStyled>
            <p>조회기간</p>
            <input type="date"></input>
            <p>~</p>
            <input type="date"></input>
            <button>조 회</button>
          </PeriodStyled>
          <OrderlistStyled>
            <p>총 2건</p>
            <OrderTable></OrderTable>
          </OrderlistStyled>
        </OrderContainer>
      </TotalStyled>
    </>
  );
};

export default Orderpage;

//0512 02:17
