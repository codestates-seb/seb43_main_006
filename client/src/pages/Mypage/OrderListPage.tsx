import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark } from "@components/Common/Button";
import Pagination from "@components/AlcoholPage/Pagination";

interface Orderitem {
  orderId: number;
  orderStatus: string;
  orderedAt: string;
  pickupDate: string;
  titleKor: string;
  quantity: number;
  itemId: number;
}

interface OrderTableProps {
  orderlist: Orderitem[];
}

interface ReveiwUpdateProps {
  itemId: number;
}

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const OrderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.div`
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
`;

const OrderpageHeadStyled = styled.div`
  border: 2px solid #dedede;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  height: 100px;
  color: #181818;
  font-weight: 600;
`;

const OrderpageMainStyled = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
  padding-left: 10px;
  line-height: 25px;
`;

const PeriodStyled = styled.div`
  border: 2px solid #dedede;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 170px;
  padding-right: 170px;
  > * {
    margin-left: 20px;
  }
  > input {
    height: 30px;
    width: 250px;
  }
  > p {
    font-weight: 600;
  }
`;

const OrderlistStyled = styled.div`
  border: 2px solid #dedede;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-grow: 1;
  > p {
    font-weight: 600;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const StyledTable = styled.table`
  width: 1240px;
  height: 500px;
  font-size: 18px;
`;

const StyledTh = styled.th`
  padding: 8px;
  font-weight: 600;
`;

const StyledTd = styled.td`
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  :nth-child(3) {
    cursor: pointer;
  }
`;

const PigStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
`;

const OrderTable = ({ orderlist }: OrderTableProps) => {
  const navigate = useNavigate();

  const handleDetailBtn = (itemId: number) => {
    navigate(`/alcohol/detail/${itemId}`);
  };

  //후기연결
  const ReviewWindow = (itemId: number) => {
    const reviewCreate: ReveiwUpdateProps = {
      itemId,
    };
    navigate(`/review/edit/${itemId}`, {
      state: { reviewCreate },
    });
  };
  // const realOrderList = orderlist;

  const OrderPatchHandle = (orderId: number) => {
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/order/${orderId}/cancel`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
            "ngrok-skip-browser-warning": "69420",
          },
        },
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>주문날짜</StyledTh>
            <StyledTh>픽업날짜</StyledTh>
            <StyledTh>구매목록</StyledTh>
            <StyledTh>수량(개)</StyledTh>
            <StyledTh>상태</StyledTh>
            <StyledTh>주문취소</StyledTh>
            <StyledTh>후기작성</StyledTh>
          </tr>
        </thead>
        <tbody>
          {orderlist.map((el: Orderitem, idx: number) => {
            return (
              <tr key={idx}>
                <StyledTd>{el.orderedAt}</StyledTd>
                <StyledTd>{el.pickupDate}</StyledTd>
                <StyledTd onClick={() => handleDetailBtn(el.itemId)}>{el.titleKor}</StyledTd>
                <StyledTd>{el.quantity}</StyledTd>
                <StyledTd>{el.orderStatus}</StyledTd>
                <StyledTd>
                  {el.orderStatus === "픽업 완료" || el.orderStatus === "주문 취소" ? null : (
                    <div className="button-container">
                      <ButtonDark
                        width="100px"
                        height="50%"
                        onClick={() => {
                          OrderPatchHandle(el.orderId);
                        }}
                        disabled={el.orderStatus === "픽업 완료" || el.orderStatus === "주문 취소"}
                      >
                        취소
                      </ButtonDark>
                    </div>
                  )}
                </StyledTd>
                <StyledTd>
                  {el.orderStatus !== "픽업 완료" ? null : (
                    <div className="button-container">
                      <ButtonDark
                        width="100px"
                        height="50%"
                        onClick={() => ReviewWindow(el.itemId)}
                        disabled={el.orderStatus !== "픽업 완료"}
                      >
                        후기
                      </ButtonDark>
                    </div>
                  )}
                </StyledTd>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};
const OrderPage = () => {
  const [orderlist, setOrderlist] = useState<Orderitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0); //페이지네이션관련
  const [currentPage, setCurrentPage] = useState<number>(1); //페이지네이션관련
  const [choiceFronDay, setChoiceFronDay] = useState<string>(""); //조회할때 선택하는 날짜앞부분
  const [choiceBackDay, setChoiceBackDay] = useState<string>(""); //조회할때 선택하는 날짜뒷부분
  const [filterlist, setFilterlist] = useState<Orderitem[]>([]); //정신없는 데이터를 새로 다듬은것.
  const [userName, setUserName] = useState<string>("");
  //페이지네이션관련
  const totalPg = Math.ceil(totalLength / 5);
  const pageData = filterlist.slice(5 * (currentPage - 1), 5 * currentPage);
  //조회버튼관련
  const Search = () => {
    const newData = orderlist.slice();
    const first = new Date(choiceFronDay);
    const second = new Date(choiceBackDay);
    setFilterlist(newData.filter((el) => new Date(el.orderedAt) >= first && new Date(el.orderedAt) <= second));
    setCurrentPage(1);
  };

  useEffect(() => {
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res.data.data.slice().sort((a: any, b: any) => +new Date(b.orderedAt) - +new Date(a.orderedAt));
        const newData = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].itemOrders.length; j++) {
            const singleData = data[i].itemOrders[j];
            singleData["orderedAt"] = data[i].orderedAt;
            singleData["orderStatus"] = data[i].orderStatus;
            singleData["pickupDate"] = data[i].pickupDate;
            singleData["orderId"] = data[i].orderId;
            newData.push(singleData);
          }
        }
        setOrderlist(newData);
        setFilterlist(newData);
      })
      .catch((err) => console.error(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/members`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => setUserName(res.data.data.displayName))
      .catch((err) => console.error(err));
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
            <p>{userName}님의 등급은 Green입니다.</p>
          </OrderpageHeadStyled>
          <OrderpageMainStyled>
            <p>주문내역</p>
            <p>총 {filterlist.length}건</p>
          </OrderpageMainStyled>
          <PeriodStyled>
            <p>주문기간조회</p>
            <input type="date" className="FrontInput" onChange={(e) => setChoiceFronDay(e.target.value)}></input>
            <p>~</p>
            <input type="date" className="BackInput" onChange={(e) => setChoiceBackDay(e.target.value)}></input>
            <ButtonDark width="120px" height="70%" onClick={Search}>
              조 회
            </ButtonDark>
          </PeriodStyled>
          <OrderlistStyled>
            {filterlist.length !== 0 ? <OrderTable orderlist={pageData}></OrderTable> : <div>주문내역이 없습니다.</div>}
          </OrderlistStyled>
          <PigStyled>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
              totalData={filterlist.length}
            ></Pagination>
          </PigStyled>
        </OrderContainer>
      </TotalStyled>
    </>
  );
};

export default OrderPage;
