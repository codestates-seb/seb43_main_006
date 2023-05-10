import React from "react";
import styled from "styled-components";
import AlcoholList from "../components/AlcoholPage/AlcoholList";

// 전체적인 컨테이너
const AlcoholContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 25px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

// 주류 카테고리
const TabNav = styled.div`
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
  display: flex;
  font-size: 14px;
  height: 40px;

  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    flex-direction: row;
    cursor: pointer;

    li {
      padding: 10px 0;
    }
    .tab_selected {
      border-bottom: 2.5px solid ${({ theme }) => theme.colors.fontColor};
    }
  }
`;

const Alcohol = () => {
  return (
    <AlcoholContainer className="main">
      <TabNav>
        <ul>
          <li className="tab_selected">전체</li>
          <li>위스키</li>
          <li>와인</li>
          <li>브랜디</li>
          <li>보드카</li>
          <li>럼</li>
          <li>테킬라</li>
          <li>사케</li>
          <li>럼</li>
          <li>기타</li>
        </ul>
      </TabNav>
      <AlcoholList />
    </AlcoholContainer>
  );
};

export default Alcohol;
