import React from "react";
import styles from "./Input.module.css";

export default function Input({ label, input }) {
  return (
    <div className={styles["input-wrapper"]}>
      <label className={styles["input__label"]} htmlFor={input.id}>
        {label}
      </label>
      <input className={styles["input__input"]} {...input} />
    </div>
  );
}
