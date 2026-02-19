import { calculateProgress } from "./utils/progress.js";

export const updateScoreUI = (scoreDisplay, score) => {
  scoreDisplay.textContent = `⭐ ${score}`;
};

export const updateProgressUI = (progressBar, current, total) => {
  const percent = calculateProgress(current, total);
  progressBar.style.width = `${percent}%`;
};

export const showQuestionUI = ({ questionEl, optionsEl }, questionObj, qIndex, total) => {
  questionEl.textContent = `Q${qIndex + 1}/${total}: ${questionObj.question}`;
  optionsEl.innerHTML = "";

  questionObj.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.dataset.index = index;
    optionsEl.appendChild(btn);
  });
};

export const showResultUI = ({ resultText, highScoreText }, score, total, percent, highScore) => {
  resultText.textContent = `You scored ${score} / ${total} (${percent}%)`;
  highScoreText.textContent = `High Score: ${highScore} / ${total}`;
};
