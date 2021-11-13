import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const id = Math.random().toLocaleString();
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{props.label}</label>
      <input
        onChange={props.onChange}
        type={props.type || "number"}
        id={id}
        value={props.value}
        min={props.min || "1"}
        required
      />
    </div>
  );
};

export default Input;
