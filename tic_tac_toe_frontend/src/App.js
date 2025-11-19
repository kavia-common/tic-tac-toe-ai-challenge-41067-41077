import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { checkWinner, findBestMove } from "./utils/minimax";
import "./App.css";

// Theme colors as per project style guide:
const COLORS = {
  primary: "#3b82f6",   // Blue
  secondary: "#64748b", // Gray
  success: "#06b6d4",   // Cyan
  error: "hsl(0 84% 60%)",
};
// For turning indicator labels
const PLAYER_LABELS = { X: "You (X)", O: "AI (O)" };

/**
 * PUBLIC_INTERFACE
 * Main Game Component for Tic Tac Toe vs AI.
 */
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // Board
  const [isXNext, setIsXNext] = useState(true); // Human always X
  const [status, setStatus] = useState(""); // To display winner/draw
  const [winLine, setWinLine] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // For theme toggle (reuse original template's approach)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // Handle AI move after user's X turn
  useEffect(() => {
    const result = checkWinner(squares);
    if (result && !isGameOver) {
      finishGame(result);
    } else if (!isXNext && !isGameOver) {
      // AI turn (O)
      const bestMove = findBestMove(squares, "O");
      if (typeof bestMove === "number") {
        // Simulate quick AI with a short setTimeout for accessibility
        setTimeout(() => {
          const nextSquares = squares.slice();
          nextSquares[bestMove] = "O";
          const res = checkWinner(nextSquares);
          setSquares(nextSquares);
          if (res) {
            finishGame(res);
          } else {
            setIsXNext(true);
          }
        }, 333); // Delay for user clarity
      }
    }
    // eslint-disable-next-line
  }, [isXNext, isGameOver, squares]);

  /**
   * PUBLIC_INTERFACE
   * Handles click on a square.
   * @param {number} idx
   */
  function handleSquareClick(idx) {
    if (isGameOver || squares[idx]) return;
    if (!isXNext) return; // Wait for AI turn
    const nextSquares = squares.slice();
    nextSquares[idx] = "X";
    setSquares(nextSquares);
    setIsXNext(false);
  }

  function finishGame(result) {
    let message = "";
    if (result.winner === "draw") {
      message = "It's a draw!";
    } else if (result.winner === "X") {
      message = "You win! 🎉";
    } else if (result.winner === "O") {
      message = "AI wins!";
    }
    setStatus(message);
    setWinLine(result.line);
    setIsGameOver(true);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setStatus("");
    setWinLine(null);
    setIsGameOver(false);
  }

  // UI helpers
  const whoseTurn = isGameOver
    ? null
    : isXNext
    ? PLAYER_LABELS.X
    : PLAYER_LABELS.O;

  // Animate board in on mount (with CSS .animate-in)
  const [boardAnimate, setBoardAnimate] = useState(false);
  useEffect(() => {
    setBoardAnimate(true);
  }, []);

  // Animate status text on change
  const [statusAnim, setStatusAnim] = useState(false);
  useEffect(() => {
    setStatusAnim(true);
    const t = setTimeout(() => setStatusAnim(false), 550);
    return () => clearTimeout(t);
  }, [status, isXNext]); // re-animate on update

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
        {/* Theme toggle button */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <div className="ttt-container">
          <h1 className="ttt-title" style={{ color: COLORS.primary, fontWeight: 700 }}>
            Tic Tac Toe
          </h1>
          <div
            className={`ttt-status${statusAnim ? " status-anim" : ""}${isGameOver && winLine ? " win-status" : ""}`}
            aria-live="polite"
            aria-atomic="true"
            style={{
              color: isGameOver
                ? status.includes("win")
                  ? COLORS.success
                  : status.includes("draw")
                  ? COLORS.secondary
                  : COLORS.error
                : COLORS.secondary,
              minHeight: "2.5rem",
              marginBottom: "0.75rem",
              fontSize: "1.15rem",
            }}
          >
            {isGameOver ? status : `Turn: ${whoseTurn}`}
          </div>
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            disabled={isGameOver || !isXNext}
            winLine={winLine}
            className={boardAnimate ? "animate-in" : ""}
          />
          {/* Restart Button */}
          <button
            className="ttt-restart-btn"
            onClick={handleRestart}
            style={{
              background: COLORS.primary,
              color: "#fff",
              marginTop: "1.5rem",
            }}
            aria-label="Restart Game"
          >
            Restart
          </button>
        </div>
        <p className="ttt-footer" style={{ color: COLORS.secondary, opacity: 0.9, marginTop: "3rem", fontSize: "0.98rem" }}>
          <span style={{ color: COLORS.primary, fontWeight: 600 }}>Instructions: </span>
          You (X) play against the AI (O). Click an empty square to move. First to 3 in a row wins. Good luck!
        </p>
      </header>
    </div>
  );
}

export default App;
