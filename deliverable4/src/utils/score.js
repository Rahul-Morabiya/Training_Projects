export const calculatePercentage = (score, total) =>
  Math.round((score / total) * 100);

export const isHighScore = (newScore, storedScore) =>
  storedScore === null || newScore > storedScore;
