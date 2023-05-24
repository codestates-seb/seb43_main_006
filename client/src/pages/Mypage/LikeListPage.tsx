import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark } from "@components/Common/Button";
import Pagination from "@components/AlcoholPage/Pagination";
import PriceDisplay from "@components/Common/PriceDisplay";

//components
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
const PageTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  height: 100px;
`;

const LikepageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
`;

//누구누구님 등급써있는부분
const LikepageHeadStyled = styled.div`
  border: 3px solid #dedede;
  font-size: 18px;
  color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  padding-left: 10px;
  font-weight: 600;
`;

//찜리스트 나오는 부분
const LikepageMainStyled = styled.div`
  > * {
    font-size: 18px;
  }
`;
const HeadTable = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-left: 10px;
  font-weight: 600;
  line-height: 25px;
`;
const TotalTableStyled = styled.div`
  border: 3px solid #dedede;
  flex-grow: 1;
`;
const StyledTable = styled.table`
  font-size: 18px;
  width: 1240px;
  height: 300px;
`;

const StyledTh = styled.th`
  padding: 8px;
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
  > img {
    width: 50%;
    height: 80px;
    cursor: pointer;
  }
  :nth-child(2) {
    cursor: pointer;
  }
`;

//맨밑 페이지네이션부분
const PigStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
`;

const LikePage = () => {
  const [likelist, setLikelist] = useState<Likeitem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalLength / 5);
  const paginationData = likelist.slice(5 * (currentPage - 1), 5 * currentPage);

  const LikeGetHandle = () => {
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
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
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
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
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
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
    const access_token = `Bearer ${localStorage.getItem("authToken")}`;
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
          <PageTitle>
            <div>My Page</div>
            <MdOutlineKeyboardArrowRight size="20px" />
            <div>찜리스트</div>
          </PageTitle>
          <LikepageHeadStyled>
            <p>{userName}님의 등급은 Green입니다.</p>
          </LikepageHeadStyled>
          <LikepageMainStyled>
            <HeadTable>
              <p>찜리스트</p>
              <p>총 {likelist.length}건</p>
            </HeadTable>
            <TotalTableStyled>
              <StyledTable>
                <thead>
                  <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>상품 목록</StyledTh>
                    <StyledTh>가 격(원)</StyledTh>
                    <StyledTh></StyledTh>
                    <StyledTh></StyledTh>
                  </tr>
                </thead>

                {paginationData.length !== 0 ? (
                  <tbody>
                    {paginationData.map((el: Likeitem, idx: number) => {
                      return (
                        <tr key={idx}>
                          <StyledTd>
                            <img src={el.profile} onClick={() => handleDetailBtn(el.itemId)} />
                          </StyledTd>
                          <StyledTd onClick={() => handleDetailBtn(el.itemId)}>{el.titleKor}</StyledTd>
                          <StyledTd>
                            <PriceDisplay price={el.price} />
                          </StyledTd>
                          <StyledTd>
                            <div className="button-container">
                              <ButtonDark
                                width="100px"
                                height="50%"
                                onClick={() => {
                                  handleCartBtn(el.itemId);
                                }}
                              >
                                장바구니
                              </ButtonDark>
                            </div>
                          </StyledTd>
                          <StyledTd>
                            <div className="button-container">
                              <ButtonDark
                                width="100px"
                                height="50%"
                                onClick={() => {
                                  handleDeleteBtn(el.itemId);
                                }}
                              >
                                삭제
                              </ButtonDark>
                            </div>
                          </StyledTd>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td>찜리스트가 없습니다.</td>
                    </tr>
                  </tbody>
                )}
              </StyledTable>
            </TotalTableStyled>
          </LikepageMainStyled>
          <PigStyled>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
              totalData={likelist.length}
            />
          </PigStyled>
        </LikepageContainer>
      </TotalStyled>
    </>
  );
};

export default LikePage;
