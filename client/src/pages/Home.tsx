import maintop from "@assets/images/Maintop.png";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Homelayout1, Homelayout2, Homelayout3, Homelayout5 } from "./Homelayout";

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
    <HomeContainer y={y}>
      <img src={maintop} alt="Main Top" className="Maintop" />
      <div className="mainview">
        <LayoutContainer1 y={y} />
        <LayoutContainer2 y={y} />
        <LayoutContainer3 y={y} />
        <LayoutContainer5 y={y} />
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
  & div.mainview {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: sticky;
  }
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
`;

const LayoutContainer1 = styled(Homelayout1)<MainscrollProps>``;

const LayoutContainer2 = styled(Homelayout2)<MainscrollProps>``;

const LayoutContainer3 = styled(Homelayout3)<MainscrollProps>``;

const LayoutContainer5 = styled(Homelayout5)<MainscrollProps>``;
