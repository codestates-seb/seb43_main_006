import React, { useState } from "react";
import styled from "styled-components";

// components
import AlcoholItem from "../components/AlcoholDetailPage/AlcoholItem";

const AlcoholDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 25px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

const AlcoholDetail = () => {
  return (
    <AlcoholDetailContainer className="main">
      <AlcoholItem />
    </AlcoholDetailContainer>
  );
};

export default AlcoholDetail;
