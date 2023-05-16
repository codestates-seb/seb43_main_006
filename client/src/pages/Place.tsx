//지도페이지

import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <>
      <TotalStyled>
        <PlaceContainer>
          <MapBodyStyled>
            <MapPartStyled>
              지도부분
              <MapComponent />
            </MapPartStyled>
            <ListPartStyled>리스트부분</ListPartStyled>
          </MapBodyStyled>
          <MapBottomStyled>
            <button onClick={() => navigate("/cart")}>선택</button>
          </MapBottomStyled>
        </PlaceContainer>
      </TotalStyled>
    </>
  );
};

export default Place;
