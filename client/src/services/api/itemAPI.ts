import instance from "./axiosInstance";

export const getItemsList = (page: number, size: number, sortBy: string, category: string) => {
  const params: { page: number; size: number; sortBy: string; category?: string } = { page, size, sortBy };
  if (category !== "전체") {
    params.category = category;
  }
  return instance.get("/items", {
    params,
    // No-Auth 헤더를 추가하여 이 요청이 토큰을 필요로 하지 않음을 표시,
    headers: { "No-Auth": "True" },
  });
};

export const getItem = (itemId: number) => {
  return instance.get(`/items/${itemId}`, {
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

export const getItemReview = (itemId: number) => {
  return instance.get(`/items/${itemId}/reviews`, {
    headers: { "No-Auth": "True" },
  });
};

export const getReviewDetail = (itemId: number, reviewId: number) => {
  return instance.get(`/items/${itemId}/reviews/${reviewId}`);
};

export const deleteItemReview = (itemId: number, reviewId: number) => {
  return instance.delete(`/items/${itemId}/reviews/${reviewId}`);
};

export const updateItemReview = (itemId: number, reviewId: number, formData: FormData) => {
  return instance.patch(`/items/${itemId}/reviews/${reviewId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createItemReview = (itemId: number, formData: FormData) => {
  return instance.post(`/items/${itemId}/reviews`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getItemSearch = (page: number, size: number, title: string) => {
  return instance.get(`/items/search`, {
    params: {
      page,
      size,
      title,
    },
    headers: { "No-Auth": "True" },
  });
};
