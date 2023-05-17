import instance from "./axiosInstance";

export const getItemsList = (page: number, size: number, sortBy: string, category: string) => {
  const params: { page: number; size: number; sortBy: string; category?: string } = { page, size, sortBy };
  if (category !== "전체") {
    params.category = category;
  }
  return instance.get("/items/", {
    params,
    headers: { "No-Auth": "True" }, // No-Auth 헤더를 추가하여 이 요청이 토큰을 필요로 하지 않음을 표시,
  });
};

export const getItem = (id: number) => {
  return instance.get(`/items/${id}`, {
    headers: { "No-Auth": "True" },
  });
};

export const getItemLike = (itemId: number) => {
  return instance.get(`/items/${itemId}/is-favorite`);
};

export const createItemLike = (itemId: number) => {
  return instance.post(`/items/${itemId}/favorite`, {});
};

export const deleteItemLike = (itemId: number) => {
  return instance.delete(`items/${itemId}/favorite`);
};
