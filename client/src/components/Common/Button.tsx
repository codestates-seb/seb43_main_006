import styled from "styled-components";
import { BtnProps } from "types/Interfaces";
import React from "react";
const BtnDark = styled.button<BtnProps>`
  ${({ theme }) => theme.common.flexCenter};
  padding: 14px 0;
  letter-spacing: 1px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ theme }) => theme.colors.themeColor};
  color: white;
  border: none;
  border-radius: ${({ borderRadious }) => borderRadious};
  cursor: pointer;
  &:hover {
    filter: brightness(80%);
  }
`;

const ButtonDark: React.FC<BtnProps> = ({
  children,
  width,
  height,
  fontSize = "14px",
  fontWeight = "500",
  border = "none",
  borderRadious = "2px",
  onClick,
  disabled,
}: BtnProps) => {
  return (
    <BtnDark
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      borderRadious={borderRadious}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BtnDark>
  );
};

const BtnLight = styled(BtnDark)`
  border: 1px solid lightgray;
  background-color: white;
  color: ${({ theme }) => theme.colors.themeColor};
`;
const ButtonLight: React.FC<BtnProps> = ({
  children,
  width,
  height,
  fontSize = "14px",
  fontWeight = "500",
  border = "none",
  borderRadious = "2px",
  onClick,
  disabled,
}: BtnProps) => {
  return (
    <BtnLight
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      borderRadious={borderRadious}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BtnLight>
  );
};

export { ButtonLight, ButtonDark };
