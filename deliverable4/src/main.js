import { questions } from "./data/questions.js";
import { startQuiz, selectAnswer, nextQuestion, endQuiz } from "./quiz.js";

const elements = {
  quizSelection: document.getElementById("quiz-selection"),
  quizSection: document.getElementById("quiz-section"),
  resultSection: document.getElementById("result-section"),
  questionEl: document.getElementById("question"),
  optionsEl: document.getElementById("options"),
  nextBtn: document.getElementById("next-btn"),
  endBtn: document.getElementById("end-btn"),
  scoreDisplay: document.getElementById("score-display"),
  resultText: document.getElementById("result-text"),
  highScoreText: document.getElementById("high-score-text"),
  restartBtn: document.getElementById("restart-btn"),
  progressBar: document.getElementById("progress-bar")
};

const quizButtons = document.getElementById("quiz-buttons");

questions.forEach(({ name }, index) => {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.classList.add("primary");
  btn.addEventListener("click", () => startQuiz(index, elements));
  quizButtons.appendChild(btn);
});

elements.optionsEl.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    selectAnswer(Number(e.target.dataset.index), elements);
  }
});

elements.nextBtn.addEventListener("click", () => nextQuestion(elements));
elements.endBtn.addEventListener("click", () => endQuiz(elements));

elements.restartBtn.addEventListener("click", () => {
  elements.resultSection.classList.add("hidden");
  elements.quizSelection.classList.remove("hidden");
});
