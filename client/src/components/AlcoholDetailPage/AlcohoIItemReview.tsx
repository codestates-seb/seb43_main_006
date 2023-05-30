import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowDownLeftCircleFill, BsArrowUpRightCircleFill } from "react-icons/bs";
import { ItemReviewsType } from "types/AlcholInterfaces";
import { getItemReview } from "@services/api";
import ReviewList from "@AlcoholDetailPage/ReviewList";

interface ItemReviewsProps {
  itemId: number;
  reviewRating: number;
}

const ItemContentContainer = styled.div`
  margin-top: 20px;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
  height: 100%;

  > ul {
    padding: 1rem;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    margin: auto 0;
    height: 210px;
    display: flex;
    gap: 0.5rem;

    &::-webkit-scrollbar {
      height: 7px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .item_review_box {
      flex: 0 0 420px;
      background: #fff;
      height: 160px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 10px rgba(4, 4, 4, 0.433);
      border-radius: 7px;
      margin-right: 1rem;
      padding: 1rem;
    }
    .item_review_img {
      flex: 0 1 40%;
      height: 100%;
      ${({ theme }) => theme.common.flexCenterRow};

      img {
        width: auto;
        height: 90%;
      }
    }
    .item_reivew_content {
      flex: 1 1 60%;
      display: flex;
      padding: 0.5rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .review_only_text {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .review_content_title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .review_content {
      font-size: 13px;
      font-weight: 400;
      overflow: hidden;
      word-wrap: break-word;
      text-overflow: ellipsis;
    }
    .review_content_text {
      width: 300px;
      text-align: center;
    }
    .review_content_img {
      width: 160px;
      text-align: center;
    }
  }

  .review_no {
    ${({ theme }) => theme.common.flexCenterRow};
    height: 100px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 480px) {
    > ul {
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const ReviewTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  align-items: center;
  margin: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  .review_titletext {
    font-size: 1.5rem;
  }
  > button {
    border: none;
    cursor: pointer;
    background: none;
    font-size: 1.5rem;

    span {
      margin-right: 10px;
    }
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    margin-top: 30px;

    .review_titletext {
      font-size: 20px;
    }
    > button {
      font-size: 20px;
    }
  }
`;

const AlcoholItemReview = ({ itemId }: ItemReviewsProps) => {
  const [reviews, setReviews] = useState<ItemReviewsType[] | null>(null);
  const [isReviewAll, setIsReviewALL] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getItemReview(itemId);
      try {
        setReviews(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const HandlerReviewAll = () => {
    setIsReviewALL(!isReviewAll);
  };

  return (
    <ItemContentContainer>
      <ReviewTitleBox>
        <h2 className="review_titletext">REVIEW</h2>
        <button onClick={HandlerReviewAll}>
          <span>ALL</span>
          {!isReviewAll ? (
            <BsArrowUpRightCircleFill size={18} color={"#181818"} />
          ) : (
            <BsArrowDownLeftCircleFill size={18} color={"#181818"} />
          )}
        </button>
      </ReviewTitleBox>
      {!isReviewAll ? (
        <>
          {reviews && reviews.length !== 0 ? (
            <ul>
              {reviews.slice(0, 3).map((item: ItemReviewsType) => (
                <li className="item_review_box" key={item.reviewId}>
                  {item.reviewImages.length > 0 ? (
                    <>
                      <div className="item_review_img">
                        <img src={item.reviewImages[0]} />
                      </div>
                      <div className="item_reivew_content">
                        <h4 className="review_content_title">{item.title}</h4>
                        <p className="review_content review_content_img">{item.content}</p>
                      </div>
                    </>
                  ) : (
                    <div className="review_only_text">
                      <h4 className="review_content_title">{item.title}</h4>
                      <p className="review_content review_content_text">{item.content}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="review_no">
              <p>작성된 리뷰가 없습니다.</p>
            </div>
          )}
        </>
      ) : reviews ? (
        <ReviewList reviews={reviews} itemId={itemId} />
      ) : null}
    </ItemContentContainer>
  );
};

export default AlcoholItemReview;
