import { getHighScore, setHighScore } from "../src/utils/storage.js";

test("storage works", () => {
  setHighScore("quiz_test", 8);
  expect(getHighScore("quiz_test")).toBe(8);
});
