import { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Badge } from "./components/Badge";
import { Select } from "./components/Select";
import {
  getBestMoveHard,
  getBestMoveMedium,
  getRandomMove,
} from "./utils/ai";
import { loadScore, saveScore } from "./utils/storage";
import "./styles/app.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [difficulty, setDifficulty] = useState("hard");
  const [score, setScore] = useState(loadScore());

  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      const newScore = { ...score };
      newScore[winner]++;
      setScore(newScore);
      saveScore(newScore);
    } else if (squares.every(Boolean)) {
      const newScore = { ...score, draw: score.draw + 1 };
      setScore(newScore);
      saveScore(newScore);
    }
  }, [winner]);

  function getAIMove(board) {
    if (difficulty === "easy") return getRandomMove(board);
    if (difficulty === "medium") return getBestMoveMedium(board);
    return getBestMoveHard(board);
  }

  function handleClick(i) {
    if (squares[i] || winner) return;

    const newSquares = [...squares];
    newSquares[i] = "X";
    setSquares(newSquares);

    setTimeout(() => {
      const aiMove = getAIMove(newSquares);
      if (aiMove !== -1) {
        newSquares[aiMove] = "O";
        setSquares([...newSquares]);
      }
    }, 400);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  function resetScore() {
    const reset = { X: 0, O: 0, draw: 0 };
    setScore(reset);
    saveScore(reset);
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Draw"
    : "Your Turn (X)";

  return (
    <div className="container">
      <Card>
        <div className="header">
          <h1>Cross & Zero</h1>
          <Badge text={difficulty.toUpperCase()} />
        </div>

        <div className="controls">
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>

        <p className="status">{status}</p>

        <Board squares={squares} onClick={handleClick} />

        <div className="scoreboard">
          <span>X: {score.X}</span>
          <span>O: {score.O}</span>
          <span>Draw: {score.draw}</span>
        </div>

        <div className="actions">
          <Button onClick={resetGame}>Restart</Button>
          <Button variant="secondary" onClick={resetScore}>
            Reset Score
          </Button>
        </div>
      </Card>
    </div>
  );
}