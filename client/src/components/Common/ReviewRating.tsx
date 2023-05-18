import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

// 주류 별점 Props
export interface reviewRatingProps {
  reviewRating: number;
  size: number;
}

const ReviewRating = ({ reviewRating, size }: reviewRatingProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) =>
        Math.floor(reviewRating) !== index || reviewRating === index ? (
          <FaStar
            key={index}
            size={size}
            color={index < reviewRating ? "#e48b48" : "#e4e5e9"}
            style={{ marginRight: 2 }}
          />
        ) : (
          <FaStarHalf
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
