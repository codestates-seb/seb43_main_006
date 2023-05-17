//주문페이지

import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark } from "../../components/Common/Button";
import Pagination from "../../components/AlcoholPage/Pagination";

interface Orderitem {
  orderId: number;
  name: string;
  phone: number;
  orderStatus: string;
}
//table로 내린애
interface OrderTableProps {
  orderlist: Orderitem[];
}
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

const PageTitle = styled.div`
  /* border: 1px solid black; */
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 30px;
`;

//누구누구님 등급써있는부분
const OrderpageHeadStyled = styled.div`
  /* border: 3px solid black; */
  flex-grow: 1;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  background-color: #dedede;
  > p {
    margin-left: 10px;
    margin-bottom: 10px;
    color: #181818;
    font-weight: 600;
  }
  > div
`;

//주문내역써있는부분
const OrderpageMainStyled = styled.div`
  /* border: 3px solid black; */
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
//맨밑 페이지네이션부분
const PigStyled = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
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

const OrderTable = ({ orderlist }: OrderTableProps) => {
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
          {orderlist.map((el: Orderitem, idx: number) => {
            return (
              <tr key={idx}>
                <StyledTd>2023-03-31</StyledTd>
                <StyledTd>{el.name}</StyledTd>
                <StyledTd>{el.name}</StyledTd>
                <StyledTd>{el.phone}</StyledTd>
                <StyledTd>{el.orderStatus}</StyledTd>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};
const Orderpage = () => {
  // const navigate = useNavigate();
  const [orderlist, setOrderlist] = useState<Orderitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPg = Math.ceil(totalLength / 5);
  const pageData = orderlist.slice(5 * (currentPage - 1), 5 * currentPage);
  console.log(currentPage);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
          "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setOrderlist(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <TotalStyled>
        <OrderContainer>
          <PageTitle>
            <div>My Page</div>
            <MdOutlineKeyboardArrowRight size="20px" />
            <div>주문내역</div>
          </PageTitle>
          <OrderpageHeadStyled>
            <p>찐영이야님의 등급은 Green입니다.</p>
            <div>찜 3개</div>
            <div>찜 3개</div>
          </OrderpageHeadStyled>
          <OrderpageMainStyled>주문내역</OrderpageMainStyled>
          <PeriodStyled>
            <p>조회기간</p>
            <input type="date"></input>
            <p>~</p>
            <input type="date"></input>
            <ButtonDark width="150px" height="100%" onClick={() => console.log("메롱")}>
              조 회
            </ButtonDark>
          </PeriodStyled>
          <OrderlistStyled>
            <p>총 {orderlist.length}건</p>
            <OrderTable orderlist={pageData}></OrderTable>
          </OrderlistStyled>
          <PigStyled>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
              totalData={10}
            ></Pagination>
          </PigStyled>
        </OrderContainer>
      </TotalStyled>
    </>
  );
};

export default Orderpage;
