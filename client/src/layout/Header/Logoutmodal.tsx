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
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
`;

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        {children}
        <button onClick={onClose}>확인</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
