import React from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch() {
  return (
    <div className={styles.wrapper}>
      <label
        for="toggle"
        className={`${styles.label} ${styles["label--income"]}`}
      >
        Income
      </label>
      <div className={styles["toggle-container"]}>
        <input
          id="toggle"
          className={styles.toggle}
          type="checkbox"
          defaultChecked
        />
        <span className={styles["toggle-knob"]}></span>
      </div>

      <label
        for="toggle"
        className={`${styles.label} ${styles["label--expense"]}`}
      >
        Expense
      </label>
    </div>
  );
}
