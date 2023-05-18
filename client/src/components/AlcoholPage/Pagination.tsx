import React from "react";
import styled from "styled-components";
import { PaginationProps } from "../../types/AlcholInterfaces";

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`;

const StyledPaginationBtn = styled.button`
  width: 30px;
  height: 40px;
  margin: 0 4px;
  padding: 7px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f8f9fa;
  color: #495057;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
  &:disabled {
    cursor: not-allowed;
    color: #fff;
    background: #a84448;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, itemsPerPage, totalData }) => {
  const totalPgaes = Math.ceil(totalData / itemsPerPage);

  const handleClickPage = (pageNum: number): void => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  // 페이지네이션 버튼들
  const PaginationBtns = () => {
    const btns = [];
    for (let i = 1; i <= totalPgaes; i++) {
      btns.push(
        <StyledPaginationBtn key={i} onClick={() => handleClickPage(i)} disabled={currentPage === i}>
          {i}
        </StyledPaginationBtn>,
      );
    }

    return btns;
  };

  return <PaginationContainer>{PaginationBtns()}</PaginationContainer>;
};

export default Pagination;
