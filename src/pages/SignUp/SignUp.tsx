import React, { useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ButtonType } from "../../components/Button/Button";
import styles from "./SignUp.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangeName = (value: string) => {
    setName(value);
  };
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
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
      <div
        className={classNames(styles.backHome, {
          [styles.darkBackHome]: isDark,
        })}
      >
        Back to home
      </div>
      <Title title={"Sign Up"} />
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.darkInputContainer]: isDark,
          })}
        >
          <Input
            title={"Name"}
            value={name}
            onChange={onChangeName}
            placeholder={"Your name"}
          />
          <Input
            title={"Email"}
            value={email}
            onChange={onChangeEmail}
            placeholder={"Your email"}
          />
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
              title={"Sign Up"}
              onClick={() => {}}
              type={ButtonType.Primary}
            />
          </div>
          <div
            className={classNames(styles.singIn, {
              [styles.darkSingIn]: isDark,
            })}
          >
            Already have an account?
            <NavLink
              className={classNames(styles.navLink, {
                [styles.darkNavLink]: isDark,
              })}
              to={RoutesList.SignIn}>
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
