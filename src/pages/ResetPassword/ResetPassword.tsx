import React, { useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./ResetPassword.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";
import { ButtonType } from "../../utils/@globalTypes";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
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
      <Title title={"Reset password"} />
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.darkInputContainer]: isDark,
          })}
        >
          <Input
            title={"Email"}
            value={email}
            onChange={onChangeEmail}
            placeholder={"Your email"}
          />
          <div className={styles.button}>
            <Button
              title={"Reset"}
              onClick={() => {}}
              type={ButtonType.Primary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
