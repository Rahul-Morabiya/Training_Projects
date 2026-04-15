export const applyTax = (total: number) => {
  return total * 1.18;
};

export const applyShipping = (total: number) => {
  return total > 500 ? total : total + 50;
};