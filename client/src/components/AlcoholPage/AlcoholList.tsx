import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { AlcoholListData } from "../../types/AlcholInterfaces";
import { Link } from "react-router-dom";

// components
import AlcoholListItem from "./AlcoholListItem";
// import Pagination from "./Pagination";

// 알코올 리스트
const AlcoholListContainer = styled.div`
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  height: 100%;
  ${({ theme }) => theme.common.flexCol};
  width: 100%;
`;

// 알코올 정렬 방식
const SortingUtils = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: #d2a1a1;
  font-size: 14px;
  font-weight: 600;
`;

// 알코올 리스트
const AlcoholListBox = styled.ul`
  flex-direction: row;
  margin-top: 16px;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
`;

const AlcoholList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const size = 12;

  const { data, isLoading, error, totalData } = useAxios<AlcoholListData[]>({
    url: `${process.env.REACT_APP_API_URL}/items`,
    params: {
      page: currentPage,
      size,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <AlcoholListContainer>
      <SortingUtils>
        <div>총 {totalData}개</div>
        <div>신상품순</div>
      </SortingUtils>
      {data && (
        <AlcoholListBox>
          {data.map((item) => (
            <li key={item.itemId}>
              <Link to={`/alcohol/detail/${item.itemId}`}>
                <AlcoholListItem item={item} />
              </Link>
            </li>
          ))}
        </AlcoholListBox>
      )}
      {/* 페이지 네이션 */}
      {/* {data !== null ? (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={size}
            totalItems={totalData}
            data={data}
          />
        ) : null} */}
    </AlcoholListContainer>
  );
};

export default AlcoholList;
