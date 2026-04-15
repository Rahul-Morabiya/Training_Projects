import { apiClient } from "../../core/apiClient";
import { createKey, isDuplicate } from "../../utils/idempotency";
import type { CartItem } from "../../types/cart";

export const submitOrder = async (items: CartItem[]) => {
  const key = createKey();

  if (isDuplicate(key)) {
    throw new Error("Duplicate order prevented");
  }

  const res = await apiClient("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    data: {
      items,
      createdAt: Date.now(),
    },
  });

  return res;
};