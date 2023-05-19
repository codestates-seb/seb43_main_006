import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdRateReview } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { RequestData } from "types/AlcholInterfaces";
import { createItemReview, getReviewDetail, updateItemReview, getItem } from "@services/api";

import Alert from "@components/Common/AlertModal";
import { ButtonLight } from "@components/Common/Button";

const ReviewEditContaienr = styled.section`
  ${({ theme }) => theme.common.flexCenterCol}
  height: 100%;
  padding: 0 25px;
  color: ${({ theme }) => theme.colors.fontColor};
  margin-bottom: 30px;
`;

const ReviewFormBox = styled.div`
  margin-top: 50px;
  ${({ theme }) => theme.common.flexCenterCol}
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;
  display: flex;
  font-size: 15px;

  form {
    width: 100%;
  }
  .review_intake_box {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid lightgray;
    text-align: left;

    h3 {
      padding-left: 10px;
      font-size: 28px;
      font-weight: 700;
    }

    .review_cell {
      display: flex;
      justify-content: center;
    }
  }

  .item_info_box {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid lightgray;

    img {
      margin: 1rem 2rem;
      max-height: 200px;
      width: auto;
    }
    .review_cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;

      .item_name {
        font-size: 16px;
        font-weight: 600;
      }
      .review_rating {
        display: flex;
        gap: 3px;

        > button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
      }
    }
  }
`;

const ReviewContentBox = styled.div`
  padding: 2rem 0;
  ${({ theme }) => theme.common.flexCenterRow}
  border-bottom: 1px solid lightgray;

  .content_title {
    flex: 0 0 25%;
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
  }
  .content_input {
    flex: 0 1 75%;

    .photo_info {
      margin: 1rem 0;
      font-weight: 600;
      font-size: 14px;
    }

    input {
      width: 85%;
      padding: 0.5rem;
      border: 1px solid lightgray;
      border-radius: 3px;
      outline: none;
    }
    textarea {
      height: 160px;
      width: 85%;
      padding: 0.5rem;
      border: 1px solid lightgray;
      margin-bottom: 10px;
      outline: none;
      resize: none;
    }
    p {
      font-size: 13px;
    }
  }
  .img_upload_btn {
    display: inline-block;
    padding: 12px 30px;
    letter-spacing: 1px;
    cursor: pointer;
    background: #fff;
    color: #a84448;
    border: 1px solid #a84448;
    border-radius: 2px;
    margin-bottom: 1rem;
  }
  .file_box {
    width: 100%;
    margin-top: 10px;
    display: flex;
    gap: 1rem;

    .img_box {
      ${({ theme }) => theme.common.flexCenterCol}
    }

    img {
      width: 200px;
      height: auto;
      margin-bottom: 1rem;
    }
  }
`;

const ConfirmBtnBox = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;

  .cancel_btn {
    flex: 0 1 20%;
  }
  .confirm_btn {
    flex: 0 1 20%;

    button {
      padding: 14px 0;
      letter-spacing: 1px;
      height: 100%;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      background: ${({ theme }) => theme.colors.themeColor};
      color: white;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        filter: brightness(80%);
      }
    }
  }
`;

const ReviewEdit = () => {
  const location = useLocation();
  const review = location.state && location.state.review ? location.state.review : null;

  const navigate = useNavigate();
  // 주류 아이템 정보
  const [itemImg, setItemImg] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  const [oldImages, setOldImages] = useState<string[]>([]); // 기존 이미지의 URL

  const mode: string = review?.mode || "create";
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]); // 기존 이미지
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!review || review.itemId === null) {
        return;
      }
      const resItem = await getItem(review.itemId);
      const resReview = await getReviewDetail(review.itemId, review.reviewId);
      try {
        const itemData = resItem.data.data;
        setItemImg(itemData.profile);
        setItemName(itemData.titleKor);

        const reviewData = resReview.data.data;
        setTitle(reviewData.title);
        setContent(reviewData.content);
        setRating(reviewData.rating);
        setImages(reviewData.reviewImages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [review]);

  const handleSubmit = async () => {
    try {
      if (!title || !content || !rating) {
        alert("후기 내용을 전부 다 입력해주세요.");
        return;
      }
      const formData = new FormData();

      if (fileImages.length >= 1) {
        for (let i = 0; i < fileImages.length; i++) {
          formData.append("file", fileImages[i]);
        }
      }

      const requestBody: RequestData = {
        title,
        content,
        rating,
      };

      formData.append("requestBody", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));

      if (mode === "create") {
        await createItemReview(1, formData);
        // Handle response, e.g. navigate to the new review
      } else if (mode === "edit" && review) {
        await updateItemReview(review.itemId, review.reviewId, formData);
      }
      navigate(`/alcohol/`);
      // navigate(`/alcohol/detail/${review.itemId}`);

      setIsModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newImages = newFiles.map((file) => URL.createObjectURL(file));

      if (oldImages.length + newFiles.length > 3) {
        alert("파일은 최대 3까지 추가가 가능합니다.");
        return;
      } else {
        setFileImages((prevFiles) => [...prevFiles, ...newFiles]); // 새로 추가된 이미지의 파일 객체를 상태에 저장
        setImages((prevImages) => [...prevImages, ...newImages]); // 새로 추가된 이미지의 URL을 상태에 저장
      }
    }

    e.target.value = "";
  };

  const handleImageRemove = (idx: number) => {
    // 기존 이미지 삭제
    if (idx < oldImages.length) {
      setOldImages((prevImages) => prevImages.filter((_, i) => i !== idx));
    }
    // 새롭게 업로드한 이미지 삭제
    else {
      const newIdx = idx - oldImages.length;
      setFileImages((prevFiles) => prevFiles.filter((_, i) => i !== newIdx));
      setImages((prevImages) => prevImages.filter((_, i) => i !== newIdx));
    }
  };

  const handleCancelForm = (): void => {
    navigate("/");
  };

  return (
    <>
      <ReviewEditContaienr className="main">
        <ReviewFormBox>
          <form>
            <div className="review_intake_box">
              <MdRateReview size="32" color="#eebf78" />
              <h3>상품 리뷰 {mode === "edit" ? "수정" : "쓰기"}</h3>
            </div>
            <div className="item_info_box">
              <img src={itemImg} />
              <div className="review_cell">
                <span className="item_name">{itemName}</span>
                <div className="review_rating">
                  {[...Array(5)].map((_, idx) => (
                    <button type="button" key={idx} onClick={() => setRating(idx + 1)}>
                      <FaStar size="32" color={rating >= idx + 1 ? "#e48b48" : "#e4e5e9"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ReviewContentBox>
              <div className="content_title">리뷰제목</div>
              <div className="content_input">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    console.log(review);
                    console.log(e.target.value);
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </ReviewContentBox>
            <ReviewContentBox>
              <div className="content_title">상세리뷰</div>
              <div className="content_input">
                <textarea
                  value={content}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setContent(e.target.value);
                  }}
                />
                <p>상품 품질과 관계 없는 내용은 삭제될 수 있습니다.</p>
              </div>
            </ReviewContentBox>
            <ReviewContentBox>
              <div className="content_title">사진첨부</div>
              <div className="content_input">
                <p className="photo_info">사진은 최대 3개까지 첨부 가능합니다.</p>
                <label htmlFor="file_upload" className="img_upload_btn">
                  File Upload
                </label>
                <input id="file_upload" type="file" style={{ display: "none" }} multiple onChange={handleImageUpload} />
                <div className="file_box">
                  {oldImages.concat(images).map((img, idx) => (
                    <div className="img_box" key={idx}>
                      <img src={img} alt={`image upload ${idx}`} />
                      <button type="button" onClick={() => handleImageRemove(idx)}>
                        이미지 삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ReviewContentBox>
            <ConfirmBtnBox>
              <div className="cancel_btn">
                <ButtonLight width="100%" height="100%" fontSize="14px" fontWeight="500" onClick={handleCancelForm}>
                  취소하기
                </ButtonLight>
              </div>
              <div className="confirm_btn" onClick={() => setIsModal(true)}>
                <button type="button">{mode === "edit" ? "수정하기" : "등록하기"}</button>
              </div>
            </ConfirmBtnBox>
          </form>
        </ReviewFormBox>
      </ReviewEditContaienr>
      {isModal && (
        <Alert
          text={`${mode === "edit" ? "리뷰를 수정" : "리뷰를 등록"}하시겠습니까?`}
          onClickCancel={() => setIsModal(false)}
          onClickOk={handleSubmit}
        />
      )}
    </>
  );
};

export default ReviewEdit;
