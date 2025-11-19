import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";

/**
 * Board component renders a 3x3 tic-tac-toe grid.
 * @param {object} props
 * @param {array} props.squares the board state (array of 9)
 * @param {Function} props.onSquareClick click handler, called with index
 * @param {boolean} props.disabled disables all interaction
 * @param {array} props.winLine indexes of winning squares (if any)
 * @returns JSX.Element
 */
// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, disabled, winLine }) {
  // Helper to check if a square should be highlighted for win
  const getHighlight = idx =>
    winLine && winLine.includes(idx) ? "ttt-square-win" : "";

  const rows = [0, 1, 2];

  return (
    <div
      className="ttt-board"
      role="grid"
      aria-label="Tic Tac Toe board"
      tabIndex={0}
    >
      {rows.map(row => (
        <div className="ttt-board-row" role="row" key={row}>
          {rows.map(col => {
            const idx = row * 3 + col;
            return (
              <Square
                key={idx}
                value={squares[idx]}
                onClick={() => onSquareClick(idx)}
                disabled={disabled || Boolean(squares[idx])}
                highlightClass={getHighlight(idx)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(["X", "O", null])).isRequired,
  onSquareClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  winLine: PropTypes.arrayOf(PropTypes.number),
};

export default Board;
