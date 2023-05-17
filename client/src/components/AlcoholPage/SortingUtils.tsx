import { useState } from "react";
import styled from "styled-components";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { SortItemsProps } from "../../types/AlcholInterfaces";

// 주류 리스트 정렬 방식
const SortingUtilsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
  height: 50px;
  border-bottom: 1px solid lightgray;
  font-size: 15px;
  font-weight: 700;
  margin-top: 1.2rem;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  .sort_item_box {
    position: relative;
    display: inline-block;
    font-size: 15px;

    button {
      display: flex;
      ${({ theme }) => theme.common.flexCenter};
      border: none;
      padding: 8px;
      width: 130px;
      background-color: ${({ theme }) => theme.colors.bg};
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;

      @media screen and (max-width: 600px) {
        font-size: 14px;
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      background-color: ${({ theme }) => theme.colors.bg};
      position: absolute;
      width: 100%;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;

      li {
        text-align: center;
        font-weight: normal;
        color: black;
        padding: 12px;
        text-decoration: none;
        font-size: 14px;
        display: block;
        cursor: pointer;

        &:hover {
          background-color: #ddd;
        }
      }
    }
  }
`;

const SortItemType = ["최신순", "할인순", "낮은 가격순", "높은 가격순", "판매순"];
type SortItem = (typeof SortItemType)[number];

const sortOptions: Record<SortItem, string> = {
  최신순: "latest",
  할인순: "discountRate",
  "낮은 가격순": "lowPrice",
  "높은 가격순": "highPrice",
  판매순: "sales",
};

const SortingUtils = ({ totalData, setSortBy }: SortItemsProps) => {
  const [isSortTab, setIsSortTab] = useState<boolean>(false);
  const [sortTab, setSortTab] = useState<SortItem>("최신순");

  const handleClickSortItems = (item: SortItem): void => {
    setSortTab(item);
    setIsSortTab(false);
    setSortBy(sortOptions[item]);
  };

  return (
    <SortingUtilsContainer>
      <div>총 {totalData ? totalData : 0}개</div>
      <div className="sort_item_box">
        <button onClick={() => setIsSortTab(!isSortTab)}>
          <span>{sortTab}</span>
          {isSortTab ? <MdArrowDropUp size="30px" /> : <MdArrowDropDown size="30px" />}
        </button>
        {isSortTab && (
          <ul>
            {SortItemType.filter((item) => item !== sortTab).map((item) => (
              <li key={item} onClick={() => handleClickSortItems(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SortingUtilsContainer>
  );
};

export default SortingUtils;
