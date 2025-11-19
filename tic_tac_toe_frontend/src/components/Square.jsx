import React from "react";
import PropTypes from "prop-types";

/**
 * Square component for an individual board cell.
 * @param {object} props
 * @param {string|null} props.value "X", "O", or null
 * @param {Function} props.onClick onClick handler
 * @param {boolean} props.disabled should disable the square
 * @param {string} props.highlightClass class for win highlight
 * @returns JSX.Element
 */
/**
 * Square component for an individual board cell.
 * Also supports custom ARIA label for accessibility (from Board).
 */
// PUBLIC_INTERFACE
function Square({ value, onClick, disabled, highlightClass, ariaLabel }) {
  return (
    <button
      className={`ttt-square${highlightClass ? " " + highlightClass : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel !== undefined
        ? ariaLabel
        : value
          ? `Cell: ${value}`
          : "Empty cell"}
      tabIndex={0}
      type="button"
    >
      {value}
    </button>
  );
}
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", null]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  highlightClass: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Square;
