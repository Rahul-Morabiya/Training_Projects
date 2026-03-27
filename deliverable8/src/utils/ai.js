function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function minimax(board, isMaximizing) {
  const winner = calculateWinner(board);

  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (board.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }

    return best;
  } else {
    let best = Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }

    return best;
  }
}

export function getBestMoveHard(squares) {
  let bestMove = -1;
  let bestValue = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      squares[i] = "O";
      let moveVal = minimax(squares, false);
      squares[i] = null;

      if (moveVal > bestValue) {
        bestMove = i;
        bestValue = moveVal;
      }
    }
  }

  return bestMove;
}

export function getRandomMove(squares) {
  const empty = squares
    .map((v, i) => (v ? null : i))
    .filter(v => v !== null);

  if (empty.length === 0) return -1;

  return empty[Math.floor(Math.random() * empty.length)];
}

export function getBestMoveMedium(squares) {
  return Math.random() < 0.5
    ? getBestMoveHard(squares)
    : getRandomMove(squares);
}