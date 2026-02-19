import { calculateProgress } from "../src/utils/progress.js";

test("calculateProgress works", () => {
  expect(calculateProgress(4, 10)).toBe(50);
});
