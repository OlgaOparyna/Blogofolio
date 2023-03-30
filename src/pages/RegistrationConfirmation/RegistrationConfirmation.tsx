import React from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { ButtonType } from "../../components/Button/Button";
import styles from "./RegistrationConfirmation.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";

const RegistrationConfirmation = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  return (<div
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
    <Title title={"Registration Confirmation"} />
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
          Please activate your account with the activation
          link in the email example@gmail.com.
          <br/> Please, check your email
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
  </div>)
}

export default RegistrationConfirmation;