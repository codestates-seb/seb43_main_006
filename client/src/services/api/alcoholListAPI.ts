import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/items`;
const headers = {
  "Content-Type": "application/json",
  // accept: "text/html; charset=utf-8",
  "ngrok-skip-browser-warning": "69420", // ngrok cors 에러
};

export const getItemsList = async (page: number, size: number, sortBy: string, category: string) => {
  return await axios.get(API_URL, {
    params:
      category === "전체"
        ? {
            page,
            size,
            sortBy,
          }
        : {
            page,
            size,
            category,
            sortBy,
          },
    headers,
  });
};

export const getItem = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers,
  });
};
