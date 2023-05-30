import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Homefirst from "./Homfirst";

const Home: React.FC = () => {
  const navigate = useNavigate();

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
    <HomeContainer>
      <Homefirst />
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
  width: 100%;
  font-size: 96px;
  overflow: hidden;
`;
