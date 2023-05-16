import styled from "styled-components";
import { ItemReviewsType } from "../../types/AlcholInterfaces";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

interface ItemReviewsProps {
  reviews: ItemReviewsType[];
}

const ItemContentContainer = styled.div`
  margin-top: 20px;
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;

  ul {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    margin: auto 0;
    height: 180px;

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
      background: #fff;
      width: 450px;
      height: 160px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 10px rgba(4, 4, 4, 0.433);
      border-radius: 7px;
      margin-right: 1rem;
      border: 1px solid lightgray;
    }
    .item_review_img {
      flex: 0 1 40%;
      height: 100%;
      ${({ theme }) => theme.common.flexCenterRow};
    }
    .item_reivew_content {
      flex: 1 1 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .review_content_title {
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .review_content_text {
      font-size: 15px;
      font-weight: 400;
    }
  }

  .review_no {
    ${({ theme }) => theme.common.flexCenterRow};
    height: 100px;
    margin-bottom: 30px;
  }
`;

const ReviewTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  .review_titletext {
    font-size: 1.5rem;
  }
  button {
    border: none;
    cursor: pointer;
    background: none;
    font-size: 1.5rem;

    span {
      margin-right: 10px;
    }
  }
`;

const AlcoholItemReview = ({ reviews }: ItemReviewsProps) => {
  return (
    <ItemContentContainer>
      <ReviewTitleBox>
        <h2 className="review_titletext">REVIEW</h2>
        <button>
          <span>ALL</span>
          <BsArrowUpRightSquareFill size={18} color={"#181818"} />
        </button>
      </ReviewTitleBox>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.slice(0, 3).map((item: ItemReviewsType) => (
            <li className="item_review_box" key={item.reviewId}>
              {item.reviewImages && (
                <div className="item_review_img">
                  <img src={item.reviewImages[0]} height={"90%"} />
                </div>
              )}
              <div className={item.reviewImages ? "item_reivew_content" : "item.reviewImages "}>
                <h4 className="review_content_title">{item.title}</h4>
                <p className="review_content_text">{item.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="review_no">
          <p>작성된 리뷰가 없습니다.</p>
        </div>
      )}
    </ItemContentContainer>
  );
};

export default AlcoholItemReview;
