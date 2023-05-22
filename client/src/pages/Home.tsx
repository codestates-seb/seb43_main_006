import maintop from "../assets/images/Maintop.png";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import samplelist from "../assets/images/samplelist.png";
import { useNavigate } from "react-router-dom";
import { Homelayout1, Homelayout2, Homelayout3, Homelayout5 } from "./Homelayout";

interface ScrollState {
  x: number;
  y: number;
}
const Home: React.FC = () => {
  const navigate = useNavigate();
  const useScroll = (): ScrollState => {
    const [state, setState] = useState<ScrollState>({ x: 0, y: 0 });
    const onScroll = (): void => {
      setState({ x: window.scrollX, y: window.scrollY });
    };
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
  };
  const { y } = useScroll();
  function convertToSeconds(dateString: string): string {
    // dateString을 Date 객체로 변환합니다.
    const date = new Date(dateString);

    // '밀리초' 단위의 시간을 얻은 후, 이를 '초' 단위로 변환합니다.
    const seconds = Math.floor(date.getTime() / 1000);

    return `${seconds}`;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    const iatDate = urlParams.get("iat");
    const expDate = urlParams.get("exp");
    const memberId = urlParams.get("X-Member-ID");
    if (accessToken && refreshToken && iatDate && expDate && memberId) {
      localStorage.setItem("authToken", accessToken.replace(/^Bearer\s/, "")); // 토큰 저장
      localStorage.setItem("refresh", refreshToken); // refresh 토큰 저장
      const iat_sec = convertToSeconds(iatDate);
      const exp_sec = convertToSeconds(expDate);
      localStorage.setItem("exp", exp_sec); // 토큰 만료시간 저장
      localStorage.setItem("iat", iat_sec); // refresh 토큰 생성 시간 저장
      localStorage.setItem("memberId", memberId); // member id 저장
      navigate("/");
    }
  }, []);

  return (
    <HomeContainer>
      <img src={maintop} alt="Main Top" className="Maintop" />
      <div className="layout1" style={{ opacity: y > 800 ? (y > 1500 ? "0" : "1") : "0" }}>
        <Homelayout1 />
      </div>
      <div className="space"></div>
      <div className="layout2" style={{ opacity: y > 2000 ? (y > 2600 ? "0" : "1") : "0" }}>
        <Homelayout2 />
      </div>

      <div className="space"></div>
      <div className="layout3" style={{ opacity: y > 3300 ? (y > 4200 ? "0" : "1") : "0" }}>
        <Homelayout3 />
      </div>

      <div className="space"></div>
      <div className="layout4" style={{ opacity: y > 4900 ? (y > 6000 ? "0" : "1") : "0" }}>
        <Homelayout5 />
      </div>
      <div className="space"></div>
      <div className="saleslist">
        <p className="sales" style={{ opacity: y > 6500 ? (y > 7500 ? "0" : "1") : "0" }}>
          구매율이 높은 상품
        </p>
        <a style={{ opacity: y > 6600 ? (y > 7500 ? "0" : "1") : "0" }}>
          <div className="listtitle">위스키 계열</div>
          <ul className="1stsales">
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
          </ul>
        </a>
        <a style={{ opacity: y > 6900 ? (y > 8000 ? "0" : "1") : "0" }}>
          <div className="listtitle">보드카 계열</div>
          <ul className="2ndsales">
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
          </ul>
          {""}
          {""}
        </a>
      </div>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.section`
  color: ${({ theme }) => theme.colors.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  font-size: 96px;
  * {
    transition: all 0.5s ease;
  }
  & div.space {
    height: 700px;
  }
  & div.layout1 {
    width: 100%;
    display: flex;
  }

  .Maintop {
    position: relative;
    top: 0;
    padding-top: 0;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .sales {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 48px;
    color: ${({ theme }) => theme.colors.themeColor};
    transition: all 0.5s ease-in-out;
    padding-bottom: 40px;
  }
  .saleslist {
    max-width: 80%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & a {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-size: 20px;
    }
    & div.listtitle {
      padding-bottom: 20px;
    }
  }

  .1stsales {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 1200px;
  }

  .2ndsales {
    max-width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 1200px;
  }
  .slist {
    width: 250px;
    height: 250px;
    margin: 10px;
    object-fit: cover;
  }
  & ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: scroll;
    height: 300px;
    &li {
    }
  }
`;
