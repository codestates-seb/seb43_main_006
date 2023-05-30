import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark, ButtonLight } from "@components/Common/Button";
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
interface ReveiwUpdateProps {
  itemId: number;
}
const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const OrderpageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
`;
const PageTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: 20px;
  > div {
    font-weight: 600;
  }
`;
const InfoStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const PeriodStyled = styled.div`
  border: 3px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  > p {
    margin-left: 10px;
    margin-right: 10px;
  }
  > button {
    margin-left: 10px;
  }
`;
const TableStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 4;
`;

const LeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 4;
`;

const EachList = styled.div`
  flex-grow: 5;
  flex-basis: 0;
  margin-top: 10px;
  box-shadow: 4px 4px 4px rgba(8, 8, 8, 0.4);
  padding: 10px;
  .startdate {
    font-size: 22px;
    font-weight: 600;
  }
  .productname {
    cursor: pointer;
  }
`;
const EachTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 550;
`;
const DatePart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 18px;
  color: #046404;
  font-weight: 600;
`;
const EachBtn = styled.button`
  border: none;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: auto;
  gap: 5px;
`;
const ListStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const PagenationStyled = styled.div`
  flex-grow: 2;
`;
function authTokenExpired(authToken: string) {
  if (!authToken) {
    return true;
  }

  const decodedToken = decodeAuthToken(authToken);
  const expSeconds = decodedToken.exp;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return expSeconds < nowSeconds;
}

function decodeAuthToken(authToken: string) {
  const payload = authToken.split(".")[1];
  const decodedPayload = atob(payload);
  const { exp } = JSON.parse(decodedPayload);
  return { exp };
}

const OrderPage = () => {
  const [orderlist, setOrderlist] = useState<Orderitem[]>([]);
  const [filterlist, setFilterlist] = useState<Orderitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [choiceFronDay, setChoiceFronDay] = useState<string>("");
  const [choiceBackDay, setChoiceBackDay] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const navigate = useNavigate();
  const totalPages = Math.ceil(totalLength / 5);
  const paginationData = filterlist.slice(5 * (currentPage - 1), 5 * currentPage);

  const Search = () => {
    const newData = orderlist.slice();
    const first = new Date(choiceFronDay);
    const second = new Date(choiceBackDay);
    setFilterlist(newData.filter((el) => new Date(el.orderedAt) >= first && new Date(el.orderedAt) <= second));
    setCurrentPage(1);
  };

  const handleDetailBtn = (itemId: number) => {
    navigate(`/alcohol/detail/${itemId}`);
  };

  const ReviewWindow = (itemId: number) => {
    const reviewCreate: ReveiwUpdateProps = {
      itemId,
    };
    navigate(`/review/edit/${itemId}`, {
      state: { reviewCreate },
    });
  };
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken || authTokenExpired(authToken)) {
      navigate("/login");
      return;
    }
  });
  const OrderPatchHandle = (orderId: number) => {
    const access_token = `Bearer ${authToken}`;
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
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const access_token = `Bearer ${authToken}`;
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
        <OrderpageContainer>
          <PageTitleStyled>
            <div>My Page</div>
            <MdOutlineKeyboardArrowRight size="20px" />
            <div>주문내역</div>
          </PageTitleStyled>
          <InfoStyled>
            {userName}님의 주문내역
            <p>총 {filterlist.length}건</p>
          </InfoStyled>
          <PeriodStyled>
            <p>주문기간조회</p>
            <input type="date" className="FrontInput" onChange={(e) => setChoiceFronDay(e.target.value)}></input>
            <p>~</p>
            <input type="date" className="BackInput" onChange={(e) => setChoiceBackDay(e.target.value)}></input>
            <ButtonDark width="70px" height="30%" onClick={Search}>
              조회
            </ButtonDark>
          </PeriodStyled>
          <TableStyled>
            <LeftStyled>
              {paginationData.map((el, idx) => {
                return (
                  <div key={idx}>
                    <ListStyled>
                      <EachList>
                        <div className="startdate">{el.orderedAt} 주문</div>
                        <EachTitle>
                          <div className="order-status">{el.orderStatus}</div>
                        </EachTitle>
                        <DatePart>
                          {el.pickupDate === null ? (
                            <div></div>
                          ) : (
                            <div className="enddate">{el.pickupDate} 픽업예정</div>
                          )}
                        </DatePart>
                        <div className="productname" onClick={() => handleDetailBtn(el.itemId)}>
                          {el.titleKor}
                        </div>
                        <div className="amount">{el.quantity}개</div>
                      </EachList>
                      <EachBtn>
                        {el.orderStatus === "픽업 완료" || el.orderStatus === "주문 취소" ? null : (
                          <ButtonLight
                            width="100px"
                            height="40%"
                            onClick={() => {
                              OrderPatchHandle(el.orderId);
                            }}
                          >
                            주문취소
                          </ButtonLight>
                        )}
                        {el.orderStatus !== "픽업 완료" ? null : (
                          <ButtonDark width="100px" height="40%" onClick={() => ReviewWindow(el.itemId)}>
                            후기작성
                          </ButtonDark>
                        )}
                      </EachBtn>
                    </ListStyled>
                  </div>
                );
              })}
            </LeftStyled>
          </TableStyled>
          <PagenationStyled>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
              totalData={filterlist.length}
            />
          </PagenationStyled>
        </OrderpageContainer>
      </TotalStyled>
    </>
  );
};
export default OrderPage;
