import React, { useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./NewPassword.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";
import { ButtonType } from "../../utils/@globalTypes";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
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
      <Title title={"New password"} />
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.darkInputContainer]: isDark,
          })}
        >
          <Input
            title={"Password"}
            value={password}
            onChange={onChangePassword}
            placeholder={"Your password"}
          />
          <Input
            title={"Confirm password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder={"Confirm password"}
          />
          <div className={styles.button}>
            <Button
              title={"Set password"}
              onClick={() => {}}
              type={ButtonType.Primary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewPassword;
