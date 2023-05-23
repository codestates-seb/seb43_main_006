import maintop from "@assets/images/Maintop.png";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Homelayout1, Homelayout2, Homelayout3, Homelayout5 } from "./Homelayout";
import { ButtonDark } from "@components/Common/Button";

interface MainscrollProps {
  y: number;
}
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
    const date = new Date(dateString);

    const seconds = Math.floor(date.getTime() / 1000);

    return `${seconds}`;
  }
  useEffect(() => {
    // window.scrollTo(0, 0);
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
    <HomeContainer y={y}>
      <img src={maintop} alt="Main Top" className="Maintop" />
      <div className="space" style={{ opacity: y > 1400 ? (y > 2100 ? "0" : "1") : "0" }}>
        <Homelayout1 />
      </div>
      <div className="space" style={{ opacity: y > 2300 ? (y > 3100 ? "0" : "1") : "0" }}>
        <Homelayout2 />
      </div>
      <div className="space" style={{ opacity: y > 3600 ? (y > 4320 ? "0" : "1") : "0" }}>
        <Homelayout3 />
      </div>
      <div className="space" style={{ opacity: y > 5100 ? (y > 6300 ? "0" : "1") : "0" }}>
        <Homelayout5 />
      </div>
      <div className="bt">
        <ButtonDark
          width="160px"
          height="60px"
          fontSize="18px"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Top
        </ButtonDark>
      </div>
    </HomeContainer>
  );
};
export default Home;

const HomeContainer = styled.section<MainscrollProps>`
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
  .Maintop {
    position: relative;
    top: 0;
    padding-top: 0;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  & div.space {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 600px;
  }
  & div.bt {
    margin-top: 300px;
    margin-bottom: 100px;
  }
`;
