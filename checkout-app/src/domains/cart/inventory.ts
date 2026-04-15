export const getStockMessage = (qty: number) => {
  if (qty <= 3) return "Only few left!";
  return "";
};