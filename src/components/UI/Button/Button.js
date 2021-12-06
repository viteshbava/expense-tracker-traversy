import React from "react";
import styles from "./Button.module.css";

const COLOR = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GREEN: "green",
  RED: "red",
  DESELECTED: "deselected",
};

export default function Button({
  className,
  color = COLOR.PRIMARY,
  onClick,
  children,
  type,
}) {
  let btnStyles = styles.button;
  if (color) btnStyles = `${btnStyles} ${styles[`button--${color}`]}`;
  if (className) btnStyles = `${btnStyles} ${className}`;
  return (
    <button type={type} className={btnStyles} onClick={onClick}>
      {children}
    </button>
  );
}

export { COLOR };
