import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getItem } from "../services/api";
import { AlcoholData } from "../types/AlcholInterfaces";
import { useParams } from "react-router-dom";

// components
import AlcoholItemBuy from "../components/AlcoholDetailPage/AlcoholItemBuy";
import AlcoholItemReview from "../components/AlcoholDetailPage/AlcohoIItemReview";
import AlcoholItemContent from "../components/AlcoholDetailPage/AlcohoItemContent";

const AlcoholDetailContainer = styled.section`
  ${({ theme }) => theme.common.flexCenterCol}
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

  return (
    <AlcoholDetailContainer className="main">
      {data && (
        <>
          <AlcoholItemBuy data={data} />
          <AlcoholItemReview itemId={data.itemId} reviewRating={data.reviewRating}></AlcoholItemReview>
          <AlcoholItemContent data={data} />
        </>
      )}
    </AlcoholDetailContainer>
  );
};

export default AlcoholDetail;
