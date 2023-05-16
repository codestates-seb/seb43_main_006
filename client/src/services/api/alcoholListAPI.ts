import instance from "./axiosInstance";

export const getItemsList = async (page: number, size: number, sortBy: string, category: string) => {
  return await instance.get("/items/", {
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
    headers: { "No-Auth": "True" }, // No-Auth 헤더를 추가하여 이 요청이 토큰을 필요로 하지 않음을 표시,
  });
};

export const getItem = async (id: number) => {
  return await instance.get(`/items/${id}`, {
    headers: { "No-Auth": "True" },
  });
};

export const getItemLike = async (itemId: number) => {
  return await instance.get(`/items/${itemId}/is-favorite`);
};

export const createItemLike = async (itemId: number) => {
  return await instance.post(`/items/${itemId}/favorite`, {});
};

export const deleteItemLike = async (itemId: number) => {
  return await instance.delete(`items/${itemId}/favorite`);
};
