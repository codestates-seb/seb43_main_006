//주문페이지

import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark } from "../../components/Common/Button";
import Pagination from "../../components/AlcoholPage/Pagination";

type Dfdf = {
  itemId: number;
  quantity: number;
  titleKor: string;
};

interface Orderitem {
  orderId: number;
  phone: number;
  orderStatus: string;
  createdAt: string;
  itemOrders: Dfdf[];
  checked: boolean;
  name: string;
  totalQuantity: number;
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
  /* > div */
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
// console.log(orderlist);
// const filterData = ()=>{
//   //들어온 데이터와 이름이 같은지 확인하는 부분
//   //이름이 같으면 그거의 데이터를 밑의 테이블에 뿌릴거다.
//   for(let i=0; i< )
// }

const OrderTable = ({ orderlist }: OrderTableProps) => {
  const realOrderList = orderlist; //진짜데이터에서는 어차피 하나만 들어오니까 필요없는 로직이 될것이다.
  console.log(orderlist);
  // console.log(realOrderList); //원래 들어오는 오더
  // const filterData = orderlist[0].itemOrders;
  const date = orderlist[0].createdAt;
  const orderStatus = orderlist[0].orderStatus;
  return (
    <>
      {/* {console.log(orderlist[0].itemOrders)} */}
      {console.log(orderlist)}
      {/* {console.log(filterData)} */}
      {/* {console.log(realOrderList)} */}
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>날짜</StyledTh>
            <StyledTh>구매목록</StyledTh>
            <StyledTh>수량</StyledTh>

            <StyledTh>상태</StyledTh>
          </tr>
        </thead>
        <tbody>
          {/* {realOrderList.map((el: Orderitem, idx: number) => {
            return (
              <tr key={idx}>
                <StyledTd>{realOrderList.createdAt}</StyledTd>
              </tr>
            );
          })} */}
          {/* {realOrderList.map((el: Dfdf, idx: number) => {
            return (
              <tr key={idx}>
                <StyledTd>{date}</StyledTd>
                <StyledTd>{el.titleKor}</StyledTd>
                <StyledTd>{el.itemId}</StyledTd>
                <StyledTd>{el.quantity}</StyledTd>
                <StyledTd>{orderStatus}</StyledTd>
              </tr>
            );
          })} */}
          {orderlist.map((el: Orderitem, idx: number) => {
            return el.itemOrders.map((item, idx) => {
              return (
                <tr key={idx}>
                  <StyledTd>{el.createdAt}</StyledTd>
                  <StyledTd>{item.titleKor}</StyledTd>
                  <StyledTd>{item.quantity}</StyledTd>
                  <StyledTd>{el.orderStatus}</StyledTd>
                </tr>
              );
            });
          })}
        </tbody>
      </StyledTable>
    </>
  );
};
const Orderpage = () => {
  // const navigate = useNavigate();
  const [orderlist, setOrderlist] = useState<Orderitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0); //페이지네이션관련
  const [currentPage, setCurrentPage] = useState<number>(1); //페이지네이션관련
  // const [choiceFronDay, setChoiceFronDay] = useState<number>(0); //조회할때 선택하는 날짜앞부분
  // const [choiceBackDay, setChoiceBackDay] = useState<number>(0); //조회할때 선택하는 날짜뒷부분
  //페이지네이션관련
  const totalPg = Math.ceil(totalLength / 5);
  const pageData = orderlist.slice(5 * (currentPage - 1), 5 * currentPage);
  // console.log(currentPage);
  //조회버튼 함수
  const Search = () => {
    console.log("a");
  };
  //   // orderlist의 날짜 들어오면 그거랑
  // };
  // console.log(orderlist);

  useEffect(() => {
    axios
      // .get(`http://localhost:8081/orders`, {
      .get(`${process.env.REACT_APP_API_URL}/members/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
          "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
        },
      })

      .then((res) => {
        // console.log(res.data.data);
        setOrderlist(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(orderlist[0].itemOrders);
  // const filterlist = orderlist.filter((obj) => obj === obj.name);
  // console.log(filterlist);

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
            <input type="date" onChange={(e) => console.log(e.target.value)}></input>
            <p>~</p>
            <input type="date"></input>
            <ButtonDark width="150px" height="100%" onClick={Search}>
              조 회
            </ButtonDark>
            {/* <ButtonDark width="150px" height="100%" onClick={() => console.log("메롱")}> */}
            {/* 조 회
            </ButtonDark> */}
          </PeriodStyled>
          <OrderlistStyled>
            <p>총 {orderlist.length}건</p>
            {orderlist.length !== 0 ? <OrderTable orderlist={pageData}></OrderTable> : <div>주문내역이 없습니다.</div>}
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
