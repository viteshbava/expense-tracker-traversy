import React from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch({ incomeExpenseRef, checked }) {
  return (
    <div className={styles.wrapper}>
      <label
        htmlFor="toggle"
        className={`${styles.label} ${styles["label--income"]}`}
      >
        Income
      </label>
      <div className={styles["toggle-container"]}>
        <input
          ref={incomeExpenseRef}
          id="toggle"
          className={styles.toggle}
          type="checkbox"
          defaultChecked={checked}
        />
        <span className={styles["toggle-knob"]}></span>
      </div>

      <label
        htmlFor="toggle"
        className={`${styles.label} ${styles["label--expense"]}`}
      >
        Expense
      </label>
    </div>
  );
}
