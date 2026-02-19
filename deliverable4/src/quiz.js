import { questions } from "./data/questions.js";
import { state } from "./state.js";
import { calculatePercentage, isHighScore } from "./utils/score.js";
import { getHighScore, setHighScore } from "./utils/storage.js";
import { updateScoreUI, updateProgressUI, showQuestionUI, showResultUI } from "./ui.js";

export const startQuiz = (index, elements) => {
  state.currentQuiz = index;
  state.currentQuestion = 0;
  state.score = 0;

  const { quizSelection, quizSection, resultSection, scoreDisplay } = elements;

  quizSelection.classList.add("hidden");
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  updateScoreUI(scoreDisplay, state.score);
  loadQuestion(elements);
};

export const loadQuestion = elements => {
  const quiz = questions[state.currentQuiz];
  const { questionArr } = quiz;
  const questionObj = questionArr[state.currentQuestion];

  showQuestionUI(elements, questionObj, state.currentQuestion, questionArr.length);
  updateProgressUI(elements.progressBar, state.currentQuestion, questionArr.length);
};

export const selectAnswer = (index, elements) => {
  const quiz = questions[state.currentQuiz];
  const questionObj = quiz.questionArr[state.currentQuestion];

  if (index === questionObj.correctAnswer) {
    state.score++;
    updateScoreUI(elements.scoreDisplay, state.score);
  }

  elements.nextBtn.disabled = false;
};

export const nextQuestion = elements => {
  const quiz = questions[state.currentQuiz];

  if (state.currentQuestion < quiz.questionArr.length - 1) {
    state.currentQuestion++;
    loadQuestion(elements);
  } else {
    endQuiz(elements);
  }
};

export const endQuiz = elements => {
  const quiz = questions[state.currentQuiz];
  const total = quiz.questionArr.length;
  const percent = calculatePercentage(state.score, total);

  const key = `quiz_${state.currentQuiz}`;
  const stored = getHighScore(key);

  if (isHighScore(state.score, stored)) {
    setHighScore(key, state.score);
  }

  showResultUI(elements, state.score, total, percent, getHighScore(key));

  elements.quizSection.classList.add("hidden");
  elements.resultSection.classList.remove("hidden");
};
