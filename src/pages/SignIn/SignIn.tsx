import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

import Input from "src/components/Input";
import FormContainer from "src/components/FormContainer";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { RoutesList } from "../Router";
import styles from "./SignIn.module.scss";
import { signInUser } from "src/redux/reducers/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onSignInClick = () => {
    dispatch(
      signInUser({
        data: { email, password },
        callback: () => {
          navigate(RoutesList.Home);
        },
      })
    );
  };
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  return (
    <FormContainer
      title={"Sign In"}
      textButton={"Sign In"}
      onButtonClick={onSignInClick}
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
            to={RoutesList.SignUp}
          >
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
        type={"password"}
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
