import { useState, useEffect, useCallback } from "react";
import { IconType } from "react-icons";
import { getItemLike, createItemLike, deleteItemLike } from "@services/api";
import { useNavigate } from "react-router-dom";

interface ClickFavoriteCProps {
  itemId: number;
  icon: IconType;
  color: string;
  activeColor: string;
  size: number;
}

const ClickFavoriteItem = ({ itemId, icon: Icon, color, activeColor, size }: ClickFavoriteCProps) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const currentDate: Date = new Date();
  const currentDateNum: number = Math.floor(currentDate.getTime() / 1000);

  const expDataNum: number | null = Number(localStorage.getItem("exp"));

  useEffect(() => {
    if (expDataNum && expDataNum > currentDateNum) {
      fetchData();
    }
  }, []);

  const fetchData = useCallback(async () => {
    const response = await getItemLike(itemId);
    try {
      setIsFavorited(response.data.data.like);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onClickActive = () => {
    if (expDataNum && expDataNum > currentDateNum) {
      if (isFavorited) {
        deleteItemLike(itemId);
      } else {
        createItemLike(itemId);
      }
      setIsFavorited(!isFavorited);
    } else {
      navigate("/login");
    }
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
