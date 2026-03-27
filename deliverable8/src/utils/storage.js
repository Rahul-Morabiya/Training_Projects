const KEY = "ttt_score";

export function loadScore() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : { X: 0, O: 0, draw: 0 };
}

export function saveScore(score) {
  localStorage.setItem(KEY, JSON.stringify(score));
}