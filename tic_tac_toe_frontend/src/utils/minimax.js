/**
 * PUBLIC_INTERFACE
 * Minimax algorithm for Tic Tac Toe with best-move selection.
 * 
 * Usage: const aiMove = findBestMove(board, 'O');
 * 
 * @param {array} board - Current board (array of 9: 'X', 'O', null)
 * @param {string} aiPlayer - 'O' for AI (should play second)
 * @returns {number} index of best move for AI (0-8)
 */

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function checkWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return { winner: board[a], line };
    }
  }
  return board.every(sq => sq) ? { winner: "draw", line: null } : null;
}

// Find all empty squares
function getAvailableMoves(board) {
  return board.map((sq, idx) => (sq ? null : idx)).filter(i => i !== null);
}

// The minimax function (recursive, pure)
// AI is maximizing
function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
  const result = checkWinner(board);
  if (result) {
    if (result.winner === aiPlayer) {
      return { score: 10 - depth };
    } else if (result.winner === humanPlayer) {
      return { score: depth - 10 };
    } else if (result.winner === "draw") {
      return { score: 0 };
    }
  }

  const moves = getAvailableMoves(board);
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove = null;

  for (const idx of moves) {
    board[idx] = isMaximizing ? aiPlayer : humanPlayer;
    const { score } = minimax(
      board,
      depth + 1,
      !isMaximizing,
      aiPlayer,
      humanPlayer
    );
    board[idx] = null;
    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }
  }
  return { score: bestScore, move: bestMove };
}

// PUBLIC_INTERFACE
export function findBestMove(board, aiPlayer) {
  const humanPlayer = aiPlayer === "X" ? "O" : "X";
  const { move } = minimax([...board], 0, true, aiPlayer, humanPlayer);
  return typeof move === "number" ? move : null;
}
