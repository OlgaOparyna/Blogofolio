import React, { useState } from "react";
import Input from "../../components/Input";
import styles from "./SignIn.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";
import FormContainer from "../../components/FormContainer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  return (
    <FormContainer
      title={"Sign In"}
      textButton={"Sign In"}
      onButtonClick={()=>{}}
      footerContent={
        <div
          className={classNames(styles.singUp, {
            [styles.darkSingUp]: isDark,
          })}
        >
          Don’t have an account?
          <NavLink
            className={classNames(styles.navLink, {
              [styles.darkNavLink]: isDark,
            })}
            to={RoutesList.SignUp}>
            Sign Up
          </NavLink>
        </div>
      }
    >
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
            type={password}
          />
          <div
            className={classNames(styles.forgotPassword, {
              [styles.darkForgotPassword]: isDark,
            })}
          >
            Forgot password?
          </div>
    </FormContainer>
  );
};
export default SignIn;
