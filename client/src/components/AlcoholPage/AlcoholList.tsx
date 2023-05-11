import styled from "styled-components";
import { AlcoholListProps } from "../../types/AlcholInterfaces";
import { Link } from "react-router-dom";

// components
import AlcoholListItem from "./AlcoholListItem";
import Pagination from "./Pagination";

// 알코올 리스트
const AlcoholListContainer = styled.div`
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  height: 100%;
  ${({ theme }) => theme.common.flexCol};
  width: 100%;
  margin: 1.2rem 0 3rem 0;
`;

// 알코올 정렬 방식
const SortingUtils = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  /* background: #d2a1a1; */
  border-bottom: 1px solid lightgray;
  font-size: 16px;
  font-weight: 700;
`;

// 알코올 리스트
const AlcoholListBox = styled.ul`
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
`;

const AlcoholList = ({ data, totalData, currentPage, setCurrentPage, size }: AlcoholListProps) => {
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

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={size} totalData={totalData} />
    </AlcoholListContainer>
  );
};

export default AlcoholList;
