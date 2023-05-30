import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import Pagination from "@components/AlcoholPage/Pagination";
import PriceDisplay from "@components/Common/PriceDisplay";

interface Likeitem {
  titleKor: string;
  price: number;
  quantity: number;
  capacity: number;
  reviewRating: number;
  itemId: number;
  checked: boolean;
  profile: string;
}

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const LikepageContainer = styled.div`
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
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TableStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 8;
`;

const LeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
  box-shadow: 4px 4px 4px rgba(8, 8, 8, 0.4);
`;
const EachList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const EachTitle = styled.div`
  flex-grow: 9;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-basis: 0;
  > img {
    width: 10%;
    height: 10rem;
    cursor: pointer;
  }
  .productname {
    font-size: 22px;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .productprice {
    font-size: 22px;
  }
`;

const EachBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  background-color: #f7f7f7;
  border: none;
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

const LikePage = () => {
  const [likelist, setLikelist] = useState<Likeitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");

  const navigate = useNavigate();
  const totalPages = Math.ceil(totalLength / 5);
  const paginationData = likelist.slice(5 * (currentPage - 1), 5 * currentPage);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken || authTokenExpired(authToken)) {
      navigate("/login");
      return;
    }
  });
  const LikeGetHandle = () => {
    const access_token = `Bearer ${authToken}`;
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/favorite`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        setLikelist(res.data.data);
        setTotalLength(res.data.data.length);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    LikeGetHandle();
  }, []);

  const handleDeleteBtn = (itemId: number) => {
    const access_token = `Bearer ${authToken}`;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/items/${itemId}/favorite`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        LikeGetHandle();
      })
      .catch((err) => console.error(err));
  };

  const handleDetailBtn = (itemId: number) => {
    navigate(`/alcohol/detail/${itemId}`);
  };

  const handleCartBtn = (itemId: number) => {
    const access_token = `Bearer ${authToken}`;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/cart`,
        {
          itemId: itemId,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
            "ngrok-skip-browser-warning": "69420",
          },
        },
      )
      .then((res) => navigate("/cart"))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const access_token = `Bearer ${authToken}`;
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
        <LikepageContainer>
          <PageTitleStyled>
            <div>My Page</div>
            <MdOutlineKeyboardArrowRight size="20px" />
            <div>찜리스트</div>
          </PageTitleStyled>
          <InfoStyled>
            {userName}님의 찜리스트
            <p>총 {likelist.length}건</p>
          </InfoStyled>
          <TableStyled>
            <LeftStyled>
              {paginationData.map((el, idx) => {
                return (
                  <div key={idx}>
                    <EachList>
                      <EachTitle>
                        <img src={el.profile} onClick={() => handleDetailBtn(el.itemId)} />
                        <div className="productname" onClick={() => handleDetailBtn(el.itemId)}>
                          {el.titleKor}
                        </div>
                        <div className="productprice">
                          <PriceDisplay price={el.price} />원
                        </div>
                      </EachTitle>
                      <EachBtn>
                        <ButtonDark width="100px" height="30%" onClick={() => handleCartBtn(el.itemId)}>
                          장바구니
                        </ButtonDark>
                        <ButtonLight width="100px" height="30%" onClick={() => handleDeleteBtn(el.itemId)}>
                          삭제
                        </ButtonLight>
                      </EachBtn>
                    </EachList>
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
              totalData={likelist.length}
            />
          </PagenationStyled>
        </LikepageContainer>
      </TotalStyled>
    </>
  );
};

export default LikePage;
