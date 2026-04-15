export const applyCoupon = (total: number, code: string) => {
  if (code === "SAVE10") return total * 0.9;
  if (code === "FLAT50") return total - 50;
  return total;
};