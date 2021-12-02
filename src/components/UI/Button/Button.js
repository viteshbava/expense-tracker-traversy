import React from "react";
import styles from "./Button.module.css";

const COLOR = { PRIMARY: "primary", SECONDARY: "secondary", DARK: "dark" };
const SHAPE = { SQUARE: "square" };
const SIZE = { SMALL: "small" };

export default function Button({
  className,
  color = COLOR.PRIMARY,
  size,
  shape,
  onClick,
  children,
  disabled,
}) {
  let btnStyles = styles.button;
  if (color) btnStyles = `${btnStyles} ${styles[`button--${color}`]}`;
  if (size) btnStyles = `${btnStyles} ${styles[`button--${size}`]}`;
  if (shape) btnStyles = `${btnStyles} ${styles[`button--${shape}`]}`;
  if (className) btnStyles = `${btnStyles} ${className}`;
  return (
    <button disabled={disabled} className={btnStyles} onClick={onClick}>
      {children}
    </button>
  );
}

export { COLOR, SHAPE, SIZE };
