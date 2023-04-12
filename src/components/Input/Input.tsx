import React, { FC, ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

type InputProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  errorText?: string;
};
const Input: FC<InputProps> = ({ title, value,onChange, type, placeholder, disabled, errorText}) => {
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <label className={styles.title}>{title}</label>
      <input
        value={value}
        className={classNames(styles.input, {
          [styles.disabledInput]: disabled,
          [styles.errorInput]: errorText,
        })}
        placeholder={placeholder}
        onChange={onChangeText}
        disabled={disabled}
        type={type}
      />
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};







export default Input;
