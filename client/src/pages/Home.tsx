import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Homelayout1, Homelayout2, Homelayout3, Homelayout5, Homelayout4 } from "./Homelayout";
import { ButtonDark } from "@components/Common/Button";
import Homefirst from "./Homfirst";

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
      <Homefirst />
      <Homelayout1 />
      <Homelayout2 />
      <Homelayout3 />
      <Homelayout4 />
      <Homelayout5 />
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
  width: 100%;
  font-size: 96px;

  & div.bt {
    margin-top: 300px;
    margin-bottom: 100px;
  }
`;
