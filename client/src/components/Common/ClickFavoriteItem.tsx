import React, { useState, useEffect, useCallback } from "react";
import { IconType } from "react-icons";
import { getItemLike, createItemLike, deleteItemLike } from "../../services/api";

interface ClickFavoriteCProps {
  itemId: number;
  icon: IconType;
  color: string;
  activeColor: string;
  size: number;
}

const ClickFavoriteItem = ({ itemId, icon: Icon, color, activeColor, size }: ClickFavoriteCProps) => {
  const memberId = localStorage.getItem("memberId");
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (memberId !== null) {
      const response = await getItemLike(itemId);
      try {
        setIsFavorited(response.data.data.like);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const onClickActive = () => {
    if (isFavorited) {
      deleteItemLike(itemId);
    } else {
      createItemLike(itemId);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <Icon
      onClick={onClickActive}
      color={color}
      style={{ color: isFavorited ? activeColor : color, cursor: "pointer" }}
      size={size}
    />
  );
};

export default ClickFavoriteItem;
