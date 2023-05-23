//지도페이지

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ButtonDark } from "../components/Common/Button";
import { useDispatch } from "react-redux";
import { setMarker } from "../redux/slice/store";
const MapComponent = lazy(() => import("./Map"));
// import MapComponent from "./Map";

/*--------------------------------스타일--------------------------------*/
const TotalStyled = styled.section`
  /* border: 10px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const PlaceContainer = styled.div`
  /* border: 5px solid black; */
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  display: flex;
  flex-direction: column;
`;

//지도부분
const MapBodyStyled = styled.div`
  /* border: 5px solid red; */
  display: flex;
  flex-direction: column;
  flex-grow: 6.5;
  justify-content: center;
  align-items: center;
`;

//지도제목
const MapArticleStyled = styled.div`
  /* border: 5px solid black; */
  margin-bottom: 80px;
  font-size: 18px;
`;

const MapBottomStyled = styled.div`
  /* border: 3px solid blue; */
  flex-grow: 1;
  display: flex;
  flex-grow: 3.5;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

interface Shopitem {
  address: string;
  choice: boolean;
  comment: string;
  lat: number;
  lng: number;
  marketId: number;
  name: string;
  phone: string;
  workTime: string;
}
/*-----------------------------------------------------------------------*/
const Place = () => {
  const dispatch = useDispatch();
  const [shoplist, setShoplist] = useState<Shopitem[]>([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState<Shopitem | null>(null);

  const King = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/marts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
          "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
        },
      })
      .then((res) => {
        // console.log(res.data.content);
        setShoplist(res.data.content);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    King();
  }, []);

  const handleSelect = () => {
    // console.log(select);
    dispatch(setMarker(select));
    navigate("/cart");
  };

  return (
    <>
      <TotalStyled>
        <PlaceContainer>
          <MapBodyStyled>
            <MapArticleStyled>픽업 매장을 선택하세요</MapArticleStyled>
            <Suspense fallback={<div>loading</div>}>
              <MapComponent shoplist={shoplist} setSelect={setSelect} />
              {/* <MapComponent shoplist={shoplist} /> */}
            </Suspense>
          </MapBodyStyled>
          <MapBottomStyled>
            <ButtonDark width="350px" height="50%" onClick={handleSelect}>
              선택
            </ButtonDark>
          </MapBottomStyled>
        </PlaceContainer>
      </TotalStyled>
    </>
  );
};

export default Place;
