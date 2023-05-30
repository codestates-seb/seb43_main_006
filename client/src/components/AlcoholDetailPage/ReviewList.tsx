import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItemReview } from "@services/api";
import { ItemReviewsType } from "types/AlcholInterfaces";
import ReviewEdit from "@pages/ReviewEdit";
import { FormattedDate } from "@utils/dateUtils";

// components
import Alert from "@components/Common/AlertModal";
import ReviewRating from "@components/Common/ReviewRating";

interface ItemReviewListProps {
  reviews: ItemReviewsType[];
  itemId: number;
}

interface ReveiwUpdateProps {
  mode: string;
  itemId: number;
  reviewId: number;
}

const ReviewListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > ul {
    display: flex;
    padding: 1rem;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    li {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      border: 1px solid lightgray;
      background: #fff;
      padding: 1rem;
    }
    .review_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .font_small {
        font-size: 13px;
      }
      .gap {
        display: inline-block;
        font-size: 0;
        width: 1px;
        height: 10px;
        background: #d5d5d5;
        margin: 4px 6px 0 8px;
        vertical-align: top;
        box-sizing: border-box;
      }

      .review_update,
      .review_delete {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 13px;
      }
    }
    .review_content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;

      .content_title {
        font-size: 15px;
        font-weight: 600;
      }

      .review_img {
        display: flex;
        overflow: auto;
        flex-direction: row;
        gap: 10px;

        &::-webkit-scrollbar {
          height: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background: none;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: lightgray;
        }

        img {
          margin-bottom: 1rem;
          max-height: 200px;
          width: auto;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .review_content > .review_img > &::-webkit-scrollbar {
      display: none;
    }
  }
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    > ul {
      width: 100%;
      padding: 1rem 0;
    }
  }
`;

const ReviewList = ({ reviews, itemId }: ItemReviewListProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("memberId");
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});
  const [isModal, setIsModal] = useState<Record<number, boolean>>({});

  const HandleUpdateReview = (reviewId: number): void => {
    setIsEditing((prevState) => ({ ...prevState, [reviewId]: true }));

    const reviewUpdate: ReveiwUpdateProps = {
      mode: "edit",
      itemId,
      reviewId,
    };

    navigate(`/review/edit/${itemId}`, {
      state: { reviewUpdate },
    });
  };

  const HandleDeleteReview = async (reviewId: number) => {
    setIsModal((prevState) => ({ ...prevState, [reviewId]: true }));

    await deleteItemReview(itemId, reviewId);
    window.location.href = `/alcohol/detail/${itemId}`;
  };

  return (
    <ReviewListContainer>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.reviewId}>
              <div className="review_title">
                <div>
                  <span className="font_small">{review.displayName}</span>
                  <span className="gap">|</span>
                  <span className="font_small">{FormattedDate(review.createdAt)}</span>
                  <span className="gap">|</span>
                  <ReviewRating size={15} reviewRating={review.rating} />
                </div>
                <div>
                  {userId === review.memberId.toString() && !isEditing[review.reviewId] && (
                    <button className="review_update" onClick={() => HandleUpdateReview(review.reviewId)}>
                      수정
                    </button>
                  )}
                  {userId === "1" || userId === review.memberId.toString() ? (
                    <button
                      className="review_delete"
                      onClick={() => setIsModal((prevState) => ({ ...prevState, [review.reviewId]: true }))}
                    >
                      삭제
                    </button>
                  ) : null}
                  {isModal[review.reviewId] && (
                    <Alert
                      text={`리뷰를 삭제하시겠습니까?`}
                      onClickCancel={() => setIsModal((prevState) => ({ ...prevState, [review.reviewId]: false }))}
                      onClickOk={() => HandleDeleteReview(review.reviewId)}
                    />
                  )}
                </div>
              </div>
              <div className="review_content">
                {review.reviewImages ? (
                  <>
                    <p className="content_title">{review.title}</p>
                    <div className="review_img">
                      {review.reviewImages.map((image, idx) => (
                        <img src={image} key={idx} />
                      ))}
                    </div>
                    {!isEditing[review.reviewId] ? <p>{review.content}</p> : <ReviewEdit />}
                  </>
                ) : (
                  <>
                    <p className="content_title">{review.title}</p>
                    {!isEditing[review.reviewId] ? <p>{review.content}</p> : <ReviewEdit />}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="review_no">
          <p>작성된 리뷰가 없습니다.</p>
        </div>
      )}
    </ReviewListContainer>
  );
};

export default ReviewList;
