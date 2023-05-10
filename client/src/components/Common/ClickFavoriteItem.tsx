import React, { useState } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface ClickFavoriteCProps {
  icon: IconType;
  color: string;
  activeColor: string;
  size: number;
}

const ClickFavoriteItem: React.FC<ClickFavoriteCProps> = ({ icon: Icon, color, activeColor, size }) => {
  const [isActive, setIsActive] = useState(false); // 찜 여부 데이터 들어와야 함

  const onClickActive = () => {
    setIsActive(!isActive);
  };

  return (
    <Icon
      onClick={onClickActive}
      color={color}
      style={{ color: isActive ? activeColor : color, cursor: "pointer" }}
      size={size}
    />
  );
};

export default ClickFavoriteItem;
