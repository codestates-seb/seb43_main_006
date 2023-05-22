import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  max-width: 300px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Message = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #222222;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #222222;
  }
`;

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <Message>{children}</Message>
        <Button onClick={onClose}>확인</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
