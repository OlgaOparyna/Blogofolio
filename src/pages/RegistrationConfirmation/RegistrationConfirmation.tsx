import React from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import styles from "./RegistrationConfirmation.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { ButtonType } from "../../utils/@globalTypes";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";

const RegistrationConfirmation = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate();
  const onHomeClick = ()=>{
    navigate ("/")
  }
  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: isDark,
      })}
    >
      <NavLink
        to={RoutesList.Home}
        className={classNames(styles.backHome, {
          [styles.darkBackHome]: isDark,
        })}
      >
        Back to home
      </NavLink>
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
            Please activate your account with the activation link in the email
            example@gmail.com.
            <br /> Please, check your email
          </div>
          <div className={styles.button}>
            <Button
              title={"Go to home"}
              onClick={onHomeClick}
              type={ButtonType.Primary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
