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
  width: 100%;
  margin-bottom: 3rem;
`;

// 알코올 리스트
const AlcoholListBox = styled.ul`
  flex-direction: row;
  margin-top: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  box-sizing: border-box;

  li {
    width: 25%;
    margin-bottom: 20px;

    @media screen and (max-width: 1297px) {
      width: 33%;
    }
    @media screen and (max-width: 860px) {
      width: 50%;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const AlcoholList = ({ data, totalData, currentPage, setCurrentPage, size }: AlcoholListProps) => {
  return (
    <AlcoholListContainer>
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
