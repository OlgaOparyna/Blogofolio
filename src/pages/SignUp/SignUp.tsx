import React, { useEffect, useMemo, useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./SignUp.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import { ButtonType } from "../../utils/@globalTypes";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/reducers/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const onSignUpClick = () => {
    dispatch(
      signUpUser({
        data: { username: name, email, password },
        callback: () => navigate(RoutesList.SignIn),
      })
    );
  };
  useEffect(() => {
    if (name.length === 0) {
      setNameError("Name is required field");
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (email.length === 0) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
    } else if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);

  const isValid = useMemo(() => {
    return (
      nameError.length === 0 &&
      emailError.length === 0 &&
      passwordError.length === 0
    );
  }, [nameError]);

  // Используем, если не надо показывать никаких ошибок пользователю
  // const isValid = useMemo(() => {
  //   return (
  //     name.length > 0 &&
  //     email.length > 0 &&
  //     password.length > 0 &&
  //     confirmPassword.length > 0 &&
  //     password === confirmPassword
  //   );
  // }, [name, email, password, confirmPassword]);
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
            errorText={nameError}
          />
          <Input
            title={"Email"}
            value={email}
            onChange={onChangeEmail}
            placeholder={"Your email"}
            errorText={emailError}
          />
          <Input
            title={"Password"}
            value={password}
            onChange={onChangePassword}
            placeholder={"Your password"}
            type={"password"}
            errorText={passwordError}
          />
          <Input
            title={"Confirm password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder={"Confirm password"}
            type={"password"}
            errorText={passwordError}
          />
          <div className={styles.button}>
            <Button
              title={"Sign Up"}
              disabled={!isValid}
              onClick={onSignUpClick}
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
              to={RoutesList.SignIn}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
