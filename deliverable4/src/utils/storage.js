export const getHighScore = key => {
  const value = localStorage.getItem(key);
  return value ? Number(value) : null;
};

export const setHighScore = (key, score) =>
  localStorage.setItem(key, score);
