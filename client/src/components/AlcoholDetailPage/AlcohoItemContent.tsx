import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { AlcoholData, AlcoholListData } from "types/AlcholInterfaces";
import { getItemsList } from "@services/api";
import AlcoholListItem from "@AlcoholPage/AlcoholListItem";

interface ItemDatailProps {
  data: AlcoholData;
}

const ItemContentContainer = styled.div`
  margin: 2rem 0 5rem 0;
  display: flex;
  ${({ theme }) => theme.common.flexCol};
  max-width: ${({ theme }) => theme.widthSize.contentMax};
  width: 100%;

  .detail_box {
    margin-top: 1rem;
    width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    margin: 0.5rem 0 3rem 0;
  }
`;

const ContentTitleBox = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  margin: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  .content_titletext {
    font-size: 1.5rem;
    padding-bottom: 0.3rem;
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    .content_titletext {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 7rem;

  .content_datail_title {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 1px;
    margin-bottom: 3px;
  }
  .content_note_bold {
    width: 70px;
    font-size: 15px;
    font-weight: 600;
  }
  .content_info_bold {
    width: 100px;
    font-size: 15px;
    font-weight: 600;
  }
  .content_detail_text {
    font-size: 14px;
  }
  .content_text_box {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      flex-direction: row;
      line-height: 30px;
    }
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    gap: 2rem;
    padding-left: 2rem;
    flex-direction: column;

    .content_datail_title {
      font-size: 18px;
    }
    .content_note_bold,
    .content_info_bold {
      font-size: 14px;
    }
  }
`;

const DetailInfoBox = styled.div`
  margin-top: 60px;
  ${({ theme }) => theme.common.flexCenterCol};

  .info_img_box {
    display: flex;
    justify-content: center;
    width: 100%;

    img {
      width: 80%;
      max-width: 1000px;
      height: auto;
    }

    @media screen and (max-width: 480px) {
      img {
        width: 100vw;
      }
    }
  }
`;

const SuggestionTitle = styled.div`
  display: flex;
  width: 100%;
  font-weight: 400;
  margin: 8rem 0 1rem 0;

  .content_titletext {
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.breakpoints.mobileMax} {
    margin-top: 4rem;
    .content_titletext {
      font-size: 20px;
    }
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    display: none;
  }
`;

const SuggestionBox = styled.ul`
  width: 100%;
  display: flex;
  overflow: auto;
  white-space: nowrap;
  padding: 20px 0;
  ::-webkit-scrollbar {
    display: none;
  }

  li {
    flex: none;
    margin-right: 10px;
    width: 230px;
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.mobileMax} {
    li {
      width: 190px;
    }
  }
`;

const AlcoholItemContent = ({ data }: ItemDatailProps) => {
  const [itemData, setItemData] = useState<AlcoholListData[] | null>(null);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getItemsList(1, 12, "latest", data.categories[0]);
        setItemData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const HandleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const HandleClickItem = (id: number): void => {
    window.location.href = `/alcohol/detail/${id}`;
  };

  return (
    <ItemContentContainer>
      <ContentTitleBox>
        <h2 className="content_titletext">DETAIL</h2>
      </ContentTitleBox>
      <div className="detail_box">
        <ContentBox>
          <div>
            <p className="content_datail_title">TASTING NOTES</p>
            <ul className="content_text_box">
              <li>
                <div className="content_note_bold"> Aroma</div>
                <div className="content_detail_text">{data.aroma}</div>
              </li>
              <li>
                <div className="content_note_bold">Taste</div>
                <div className="content_detail_text">{data.taste}</div>
              </li>
              <li>
                <div className="content_note_bold">Finish</div>
                <div className="content_detail_text">{data.field}</div>
              </li>
            </ul>
          </div>
          <div>
            <p className="content_datail_title">INFORMATION</p>
            <ul className="content_text_box">
              <li>
                <div className="content_info_bold">Category</div>
                {data.categories.map((item, idx) => (
                  <div key={idx} className="content_detail_text">
                    {item}
                    {idx < data.categories.length - 1 ? ", " : ""}
                  </div>
                ))}
              </li>
              <li>
                <div className="content_info_bold">Volume</div>
                <div className="content_detail_text">{data.capacity}ml</div>
              </li>
              <li>
                <div className="content_info_bold">ABV</div>
                <div className="content_detail_text">{data.volume}%</div>
              </li>
              <li>
                <div className="content_info_bold">Country</div>
                <div className="content_detail_text">{data.country}</div>
              </li>
            </ul>
          </div>
        </ContentBox>
        <DetailInfoBox>
          <div className="info_img_box">
            <img src={`${data.detailedProfile}?${new Date().getTime()}`} alt="description" />
          </div>
        </DetailInfoBox>
        <SuggestionTitle>
          <h2 className="content_titletext">이런 상품은 어때요?</h2>
        </SuggestionTitle>
        {itemData && (
          <ScrollContainer>
            {itemData.length >= 5 ? (
              <ScrollBtn onClick={() => HandleScroll("left")}>
                <FaArrowAltCircleLeft size={45} color="lightgray" />
              </ScrollBtn>
            ) : null}
            <SuggestionBox ref={scrollRef}>
              {itemData.map((item) => (
                <li key={item.itemId} onClick={() => HandleClickItem(item.itemId)}>
                  <AlcoholListItem item={item} />
                </li>
              ))}
            </SuggestionBox>
            {itemData.length >= 4 ? (
              <ScrollBtn onClick={() => HandleScroll("right")}>
                <FaArrowAltCircleRight size={45} color="lightgray" />
              </ScrollBtn>
            ) : null}
          </ScrollContainer>
        )}
      </div>
    </ItemContentContainer>
  );
};

export default AlcoholItemContent;
