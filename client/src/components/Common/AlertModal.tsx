import styled from "styled-components";
import { AlertProps } from "../../types/Interfaces";
import { ButtonLight, ButtonDark } from "./Button";

const AlertContainer = styled.div`
  z-index: 1;
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 15px;
  position: fixed;
  top: 150px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 2px;
  height: 100px;
  width: 360px;
  padding: 30px;
  .ok {
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.colors.themeColor};
    border-radius: 2px;
    color: white;
    cursor: pointer;
  }
`;
const Alert = ({ text, onClickOk, onClickCancel }: AlertProps) => {
  return (
    <AlertContainer>
      {text}
      {onClickCancel ? (
        <>
          <ButtonLight
            width="150px"
            height="45px"
            fontSize="18px"
            borderRadious="2px"
            border="solid 1px lightgray"
            onClick={onClickOk}
          >
            이전
          </ButtonLight>
          <ButtonDark width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickCancel}>
            다음
          </ButtonDark>
        </>
      ) : (
        <ButtonDark width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickOk}>
          다음
        </ButtonDark>
      )}
    </AlertContainer>
  );
};
export default Alert;
