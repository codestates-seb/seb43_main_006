import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getItem } from "../services/api";
import { AlcoholData } from "../types/AlcholInterfaces";
import { useParams } from "react-router-dom";

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
  const { id } = useParams<string>();
  const [data, setData] = useState<AlcoholData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getItem(Number(id));
      try {
        const { data } = response;

        setData(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return <AlcoholDetailContainer className="main">{data && <AlcoholItem data={data} />}</AlcoholDetailContainer>;
};

export default AlcoholDetail;
