import styled from "styled-components";
import Answer from "@components/HelpCenter/AnswerContainer";
import { useState } from "react";
import { ButtonDark } from "@components/Common/Button";

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const HelpCenter = () => {
  const answerData = [
    "상단 마이페이지 메뉴의 mypage로 이동하시면 회원 정보 수정 페이지로 이동하실 수 있습니다!\n\n Oauth 로그인 사용자의 경우 비밀번호 수정은 제한 됩니다!",
    "결제 페이지로 이동하신 후 픽업 날짜 및 장소를 지정하실 수 있습니다! 픽업에 대한 자세한 문의는 결제 페이지의 픽업 매장 전화번호를 통해 문의 바랍니다!",
    "픽업 장소 변경을 원하시면 결제 페이지로 이동하신 후 하단에 픽업 장소를 선택하기 버튼을 클릭해 변경이 가능합니다.",
    "비밀번호의 경우 개인정보 수정 페이지에서 수정이 가능하며, Oauth 사용자의 경우 비밀번호 수정 기능은 제공 되지 않습니다.",
    "회원 탈퇴의 경우 개인정보 수정 페이지 오른쪽 하단의 버튼을 통해 회원 탈퇴가 가능하십니다.",
  ];
  const TitleData = [
    "회원정보를 수정하고 싶어요.",
    "픽업 날짜를 변경하고 싶어요.",
    "픽업 장소를 변경하고 싶어요.",
    "비밀번호를 변경하고 싶어요.",
    "회원을 탈퇴하고 싶어요.",
  ];
  const [isClick, setIsClick] = useState([false, false, false, false, false]);
  const detailControl = (idx: number) => {
    const newState = [...isClick];
    newState[idx] = !newState[idx];
    setIsClick(newState);
  };
  return (
    <Container>
      <ContentsContainer>
        <TopContainer>
          <PageName>자주 묻는 질문</PageName>
        </TopContainer>
        <MiddleContainer>
          {answerData.map((el, idx) => {
            return (
              <>
                <Title fontSize="20px" fontWeight="500">
                  {TitleData[idx]}
                  <BtnContainer>
                    <ButtonDark
                      height="50px"
                      width="80px"
                      onClick={() => {
                        detailControl(idx);
                      }}
                    >
                      {isClick[idx] ? "닫기" : "자세히"}
                    </ButtonDark>
                  </BtnContainer>
                </Title>
                {isClick[idx] ? <Answer text={el}></Answer> : null}
              </>
            );
          })}
        </MiddleContainer>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  padding: 0px 95px;
  min-height: 100vh;
`;
const ContentsContainer = styled.div`
  max-width: 1250px;
  width: 100vw;
  position: absolute;
  top: 15%;
  padding-bottom: 100px;
  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;
const PageName = styled.div`
  font-size: 35px;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  gap: 20px;
  margin-bottom: 30px;
`;

const Title = styled.div<TitleProps>`
  position: relative;
  font-size: ${({ fontSize }) => fontSize};
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ theme }) => theme.colors.themeColor};
  padding: 20px;
  color: white;
`;
const BtnContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
`;
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 768px) {
    gap: 15px;
  }
  border: 1px solid gray;
  border-radius: 2px;
`;

export default HelpCenter;
