import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

// 주류 별점 Props
export interface reviewRatingProps {
  reviewRating: number;
  size: number;
}

const StyledFaStar = styled(FaStar)`
  font-size: ${(props) => props.size}px;

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    font-size: 12px;
  }
`;

const StyledFaStarHalf = styled(FaStarHalf)`
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    font-size: 12px;
  }
`;

const ReviewRating = ({ reviewRating, size }: reviewRatingProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) =>
        Math.floor(reviewRating) !== index || reviewRating === index ? (
          <StyledFaStar
            key={index}
            size={size}
            color={index < reviewRating ? "#e48b48" : "#e4e5e9"}
            style={{ marginRight: 2 }}
          />
        ) : (
          <StyledFaStarHalf
            key={index}
            size={size}
            color={index < reviewRating ? "#e48b48" : "#e4e5e9"}
            style={{ marginRight: 2 }}
          />
        ),
      )}
    </>
  );
};

export default ReviewRating;
