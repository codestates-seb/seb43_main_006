import instance from "./axiosInstance";

export const createItemCart = (itemId: number, quantity: number) => {
  return instance.post(`/cart`, {
    itemId,
    quantity,
  });
};
