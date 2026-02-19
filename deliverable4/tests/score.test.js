import { calculatePercentage, isHighScore } from "../src/utils/score.js";

test("calculatePercentage works", () => {
  expect(calculatePercentage(5, 10)).toBe(50);
});

test("isHighScore true when higher", () => {
  expect(isHighScore(10, 5)).toBe(true);
});

test("isHighScore false when lower", () => {
  expect(isHighScore(3, 5)).toBe(false);
});
