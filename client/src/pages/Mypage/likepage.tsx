//마이페이지의 첫화면, 찜리스트 페이지

//grid 활용하는거 생각해보기!!!!

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ButtonDark } from "../../components/Common/Button";

//components
interface Likeitem {
  titleKor: string;
  price: number;
  quantity: number;
  capacity: number;
  reviewRating: number;
}

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const LikepageContainer = styled.div`
  /* border: 5px solid blue; */
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  display: flex;
  flex-direction: column;
`;

//누구누구님 등급써있는부분
const LikepageHeadStyled = styled.div`
  /* border: 3px solid black; */
  flex-grow: 3;
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

//찜리스트 나오는 부분
const LikepageMainStyled = styled.div`
  /* border: 3px solid red; */
  flex-grow: 7;
  > * {
    margin-bottom: 30px;
    font-size: 18px;
    /* margin-left: 60px; */
  }
  > p {
    margin-top: 30px;
    font-weight: 600;
    margin-left: 60px;
  }
`;
//선택상품 장바구니, 삭제 버튼
const LikeBtnStyled = styled.div`
  margin-top: 20px;
  margin-right: 37px;
  display: flex;
  flex-direction: row;
  float: right;
  gap: 37px;
  height: 52px;
  border-radius: 7px;
  > button {
    background-color: #222222;
    color: whitesmoke;
  }
`;

const StyledTable = styled.table`
  border: 1px solid black;
  font-size: 18px;
  margin-top: 200px;
  width: 1240px;
  height: 300px;
`;

const StyledTh = styled.th`
  border: 1px solid black;
  padding: 8px;
`;

const StyledTd = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
`;

const Table = () => {
  const [likelist, setLikelist] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/favorite`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
          "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
        },
      })

      .then((res) => {
        // console.log(res);
        console.log(res.data.data);
        setLikelist(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>
              <input type="checkbox" />
            </StyledTh>
            <StyledTh>상품 목록</StyledTh>
            <StyledTh>수 량(개)</StyledTh>
            <StyledTh>가 격(원)</StyledTh>
          </tr>
        </thead>
        <tbody>
          {likelist.map((el: Likeitem, idx: number) => {
            return (
              <tr key={idx}>
                <StyledTd>
                  <input type="checkbox" />
                </StyledTd>
                <StyledTd>{el.titleKor}</StyledTd>
                <StyledTd>{el.quantity}</StyledTd>
                <StyledTd>{el.price}</StyledTd>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

const Likepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <TotalStyled>
        <LikepageContainer>
          <LikepageHeadStyled>
            <p>찐영이야님의 등급은 Green입니다.</p>
          </LikepageHeadStyled>
          <LikepageMainStyled>
            <p>찜리스트</p>
            <LikeBtnStyled>
              <ButtonDark width="150px" height="100%" onClick={() => navigate("/mypage/likepage")}>
                선택상품 장바구니
              </ButtonDark>
              {/* <button>선택상품 장바구니</button> */}
              {/* 아무주소나 이동하게 해둠 */}
              <ButtonDark width="150px" height="100%" onClick={() => navigate("/mypage/likepage")}>
                선택상품 삭제
              </ButtonDark>
            </LikeBtnStyled>
            <Table></Table>
          </LikepageMainStyled>
        </LikepageContainer>
      </TotalStyled>
    </>
  );
};

export default Likepage;
