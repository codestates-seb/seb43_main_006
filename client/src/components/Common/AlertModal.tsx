import styled from "styled-components";
import { AlertProps } from "types/Interfaces";
import { ButtonLight, ButtonDark } from "./Button";

const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const AlertContainer = styled.div`
  z-index: 2;
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 30px;
  position: fixed;
  top: 30%;
  left: calc(50% - 250px);
  background-color: #f0f0f0;

  border-radius: 2px;
  width: 500px;
  padding: 70px 40px;
  .two-buttons {
    ${({ theme }) => theme.common.flexCenterRow};
    gap: 20px;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 340px;
    padding: 30px 10px;
    font-size: 14px;
    left: calc(50% - 170px);
  }
`;
const Alert = ({ title = "", text, onClickOk, onClickCancel }: AlertProps) => {
  // text 내려주실 때 개행하실 부분을 \한번만 넣어주세요!
  const splittedText = text.split("\\");

  return (
    <Container>
      <AlertContainer>
        {title !== "" ? <div className="title">{title}</div> : null}
        {splittedText.map((el, idx) => (
          <p key={idx}>{el}</p>
        ))}

        {onClickCancel ? (
          <div className="two-buttons">
            <ButtonLight
              width="150px"
              height="45px"
              fontSize="18px"
              borderRadius="2px"
              border="solid 1px lightgray"
              onClick={onClickCancel}
            >
              취소
            </ButtonLight>
            <ButtonDark width="150px" height="45px" fontSize="18px" borderRadius="2px" onClick={onClickOk}>
              확인
            </ButtonDark>
          </div>
        ) : (
          <ButtonDark width="150px" height="45px" fontSize="18px" borderRadius="2px" onClick={onClickOk}>
            확인
          </ButtonDark>
        )}
      </AlertContainer>
    </Container>
  );
};
export default Alert;
