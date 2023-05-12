import React, { useState } from "react";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import { AlcoholListData } from "../types/AlcholInterfaces";

// components
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
const AlcoholTabNavBox = styled.div`
  margin-top: 3rem;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
  display: flex;
  font-size: 15px;
  height: 40px;

  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const TabNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;

  .sub_tab {
    padding: 10px 0;
    color: darkgray;
  }
  .tab_selected {
    border-bottom: 2.5px solid ${({ theme }) => theme.colors.fontColor};
    font-weight: bold;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.fontColor};
    transition: 0.5s;
  }
`;

const Alcohol = () => {
  const size = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabCategories = ["전체", "위스키", "와인", "브랜디", "보드카", "럼", "테킬라", "사케", "럼", "기타"];

  const { data, isLoading, error, totalData } = useAxios<AlcoholListData[]>({
    url: `${process.env.REACT_APP_API_URL}/items`,
    params:
      currentTab !== 0
        ? {
            page: currentPage,
            size,
            category: tabCategories[currentTab],
          }
        : {
            page: currentPage,
            size,
          },
    currentPage,
    currentTab,
  });

  const handleClickTab = (idx: number): void => {
    setCurrentTab(idx);
    console.log(tabCategories[currentTab]);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <AlcoholContainer className="main">
      <AlcoholTabNavBox>
        <TabNav>
          {tabCategories.map((tab, idx) => {
            return (
              <li
                key={idx}
                className={currentTab === idx ? "sub_tab tab_selected" : "sub_tab"}
                onClick={() => handleClickTab(idx)}
              >
                {tab}
              </li>
            );
          })}
        </TabNav>
      </AlcoholTabNavBox>
      {typeof totalData === "number" ? (
        <AlcoholList
          data={data}
          totalData={totalData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          size={size}
        />
      ) : null}
    </AlcoholContainer>
  );
};

export default Alcohol;
