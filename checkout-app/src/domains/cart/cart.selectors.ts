export const getCartItems = (s: any) =>
  s.itemIds.map((id: string) => s.itemsById[id]);

export const getCartTotal = (s: any) =>
  s.itemIds.reduce(
    (sum: number, id: string) =>
      sum + s.itemsById[id].price * s.itemsById[id].qty,
    0
  );