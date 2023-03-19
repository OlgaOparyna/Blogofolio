import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import styles from "./Success.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";

const Success = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  return <div
    className={classNames(styles.container, {
      [styles.darkContainer]: isDark,
    })}
  >
    <div
      className={classNames(styles.backHome, {
        [styles.darkBackHome]: isDark,
      })}
    >
      Back to home
    </div>
    <Title title={"Success"} />
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.inputContainer, {
          [styles.darkInputContainer]: isDark,
        })}
      >
        <div
          className={classNames(styles.text, {
            [styles.darkText]: isDark,
          })}
        >
          Email confirmed.
          <br/>Your registration is now completed
        </div>
        <div className={styles.button}>
          <Button
            title={"Go to home"}
            onClick={() => {}}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </div>
  </div>
}

export default Success;