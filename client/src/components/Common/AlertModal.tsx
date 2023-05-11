import styled from "styled-components";
import { AlertProps } from "../../types/Interfaces";
const AlertContainer = styled.div`
  z-index: 1;
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 15px;
  position: fixed;
  top: 150px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 20px 20px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 1px 1px, rgba(0, 0, 0, 0.09) 0px -2px 3px;
  height: 100px;
  width: 360px;
  padding: 30px;
  .ok {
    padding: 5px 10px;
    background-color: #1a73e8;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
`;
const Alert = ({ text, onClick }: AlertProps) => {
  return (
    <AlertContainer>
      {text}
      <div className="ok" onClick={onClick}>
        확인
      </div>
    </AlertContainer>
  );
};
export default Alert;
