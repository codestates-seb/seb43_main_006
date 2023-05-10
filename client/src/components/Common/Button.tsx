import styled from "styled-components";
import { BtnProps } from "../../types/Interfaces";
import React from "react";
const Btn = styled.button<BtnProps>`
  ${({ theme }) => theme.common.flexCenter};

  height: ${({ height }) => height};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ bg }) => bg};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadious }) => borderRadious};
  color: ${({ color }) => color};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  cursor: pointer;
  &:hover {
    filter: brightness(80%);
  }
`;

const Button: React.FC<BtnProps> = ({
  children,
  width,
  height,
  bg,
  color,
  fontSize,
  fontWeight = "500",
  border = "none",
  borderRadious = "7px",
  onClick,
}: BtnProps) => {
  return (
    <Btn
      width={width}
      height={height}
      bg={bg}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      borderRadious={borderRadious}
      onClick={onClick}
    >
      {children}
    </Btn>
  );
};

export { Button };
