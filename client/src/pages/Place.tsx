import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ButtonDark } from "@components/Common/Button";
import { useDispatch } from "react-redux";
import { setMarker } from "../redux/slice/store";
const MapComponent = lazy(() => import("./Map"));

const TotalStyled = styled.section`
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
  display: flex;
  flex-direction: column;
  flex-grow: 6.5;
  justify-content: center;
  align-items: center;
`;

//지도제목
const MapArticleStyled = styled.div`
  border: 3px solid #dedede;
  margin-bottom: 80px;
  font-size: 18px;
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  font-weight: 600;
`;

const MapBottomStyled = styled.div`
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

const Place = () => {
  const dispatch = useDispatch();
  const [shoplist, setShoplist] = useState<Shopitem[]>([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState<Shopitem | null>(null);
  const location = useLocation();
  const items = location.state ? location.state.items : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
        setShoplist(res.data.content);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    King();
  }, []);

  const handleSelect = () => {
    dispatch(setMarker(select));
    navigate(-1);
  };
  console.log(select);
  return (
    <>
      <TotalStyled>
        <PlaceContainer>
          <MapBodyStyled>
            <MapArticleStyled>
              {select && select?.name !== null ? <p>{select?.name}</p> : <p>픽업매장을 선택하세요.</p>}
            </MapArticleStyled>
            <Suspense fallback={<div>loading</div>}>
              <MapComponent shoplist={shoplist} setSelect={setSelect} />
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
