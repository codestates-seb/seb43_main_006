//지도페이지

import React, { useState } from "react";
import styled from "styled-components";
import MapComponent from "./Map";

const TotalStyled = styled.section`
  /* border: 10px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const PlaceContainer = styled.div`
  border: 5px solid black;
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  display: flex;
  flex-direction: column;
`;
//상단검색부분
const SearchPartStyled = styled.div`
  border: 3px solid black;
  flex-grow: 1.5;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
//지도+리스트부분 전체묶은거
const MapBodyStyled = styled.div`
  border: 5px solid red;
  display: flex;
  flex-direction: row;
  flex-grow: 7.5;
`;
//왼쪽지도부분
const MapPartStyled = styled.div`
  border: 3px solid blue;
  flex-grow: 7;
`;
//오른쪽리스트부분
const ListPartStyled = styled.div`
  border: 3px solid black;
  flex-grow: 3;
`;
const MapBottomStyled = styled.div`
  border: 3px solid black;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Place = () => {
  const [inputText, setInputText] = useState("");
  const [searchPlace, setSearchPlace] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputText(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchPlace(inputText);
    // console.log(inputText);
    setInputText("");
  };

  return (
    <>
      <TotalStyled>
        <PlaceContainer>
          <SearchPartStyled>
            <input type="text" placeholder="매장을 검색하세요" onChange={onChange} value={inputText}></input>
            <button onClick={handleSubmit}>조회</button>
          </SearchPartStyled>
          <MapBodyStyled>
            <MapPartStyled>
              지도부분
              <MapComponent Place={searchPlace} />
            </MapPartStyled>
            <ListPartStyled>리스트부분</ListPartStyled>
          </MapBodyStyled>
          <MapBottomStyled>
            <button>선택</button>
          </MapBottomStyled>
        </PlaceContainer>
      </TotalStyled>
    </>
  );
};

export default Place;
