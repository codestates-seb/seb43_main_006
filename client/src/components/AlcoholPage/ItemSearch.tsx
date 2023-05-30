import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { getItemSearch } from "@services/api";
import { AlcoholListData, SearchProps } from "types/AlcholInterfaces";

const ItemSearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 45%;
  height: 100%;

  > form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  > form > input {
    padding: 0.4rem;
    height: 60%;
    max-width: 300px;
    border: 1px solid gray;
    border-radius: 3px;
    width: 100%;
    outline: none;
  }
  > form > button {
    margin: 0.3rem;
    border: none;
    cursor: pointer;
    background: none;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 535px) {
    display: none;
  }
`;

const SearchResultList = styled.ul`
  position: absolute;
  top: 90%;
  max-width: 300px;
  width: 100%;
  right: 43px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const SearchResultItem = styled.li`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background: gray;
    color: #fff;
  }
  &:focus {
    outline: none;
    background: gray;
    color: #fff;
  }
`;

const ItemSearch = ({ setSearchWord, setData, currentPage, setTotalData, size }: SearchProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<AlcoholListData[] | null>(null);
  const [searchTotal, setSearchTotal] = useState<number>(0);

  useEffect(() => {
    const fecthData = async () => {
      if (searchInput !== "") {
        try {
          const res = await getItemSearch(currentPage, size, searchInput);

          setSearchResult(res.data.data);
          setSearchTotal(res.data.pageInfo.totalElements);
        } catch {}
      }
    };
    fecthData();
  }, [searchInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSearchItem();
  };

  const handlePreviewOnclick = (item: AlcoholListData) => {
    setTotalData([item].length);
    setData([item]);
    setSearchInput("");
    setSearchResult(null);
    setSearchWord(item.titleKor);
  };

  const handleSearchItem = () => {
    setData(searchResult);
    setTotalData(searchTotal);
    setSearchWord(searchInput);
    setSearchInput("");
    setSearchResult(null);
  };

  return (
    <ItemSearchContainer>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="원하는 주류를 검색하세요." value={searchInput} onChange={handleInputChange} />
        <button type="submit">
          <BsSearch size={20} color={"#181818"} onClick={handleSearchItem} />
        </button>
      </form>
      <SearchResultList>
        {searchResult &&
          searchResult.map((item, idx) => (
            <SearchResultItem key={idx} onClick={() => handlePreviewOnclick(item)}>
              {item.titleKor}
            </SearchResultItem>
          ))}
      </SearchResultList>
    </ItemSearchContainer>
  );
};

export default ItemSearch;
