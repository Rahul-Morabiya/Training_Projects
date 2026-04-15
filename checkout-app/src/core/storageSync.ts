export const CART_STORAGE_KEY = "cart-store";

export const subscribeCartSync = (callback: () => void) => {
  window.addEventListener("storage", (e) => {
    if (e.key === CART_STORAGE_KEY) {
      callback();
    }
  });
};