import React, { useEffect, useMemo, useState } from "react";
import Input from "src/components/Input";
import styles from "./SignUp.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import { useDispatch } from "react-redux";
import { signUpUser } from "src/redux/reducers/authSlice";
import FormContainer from "src/components/FormContainer";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

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
  const onBlurName = () => {
    setNameTouched(true);
  };
  const onBlurEmail = () => {
    setEmailTouched(true);
  };
  const onBlurPassword = () => {
    setPasswordTouched(true);
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
    if (name.length === 0 && nameTouched) {
      setNameError("Name is required field");
    } else {
      setNameError("");
    }
  }, [name, nameTouched]);

  useEffect(() => {
    if (email.length === 0 && emailTouched) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords must match");
      } else if (password.length === 0 || confirmPassword.length === 0) {
        setPasswordError("Password is required field");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword, password, passwordTouched]);

  const isValid = useMemo(() => {
    return (
      nameError.length === 0 &&
      emailError.length === 0 &&
      passwordError.length === 0 &&
      nameTouched &&
      emailTouched &&
      passwordTouched
    );
  }, [
    nameError,
    emailError,
    passwordError,
    nameTouched,
    emailTouched,
    passwordTouched,
  ]);

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
    <FormContainer
      title={"Sign Up"}
      textButton={"Sign Up"}
      onButtonClick={onSignUpClick}
      footerContent={
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
      }
      submitBtnDisabled={!isValid}
    >
      <Input
        title={"Name"}
        value={name}
        onChange={onChangeName}
        placeholder={"Your name"}
        errorText={nameError}
        onBlur={onBlurName}
      />
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={"Your email"}
        errorText={emailError}
        onBlur={onBlurEmail}
      />
      <Input
        title={"Password"}
        value={password}
        onChange={onChangePassword}
        placeholder={"Your password"}
        type={"password"}
        errorText={passwordError}
        onBlur={onBlurPassword}
      />
      <Input
        title={"Confirm password"}
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        placeholder={"Confirm password"}
        type={"password"}
        errorText={passwordError}
        onBlur={onBlurPassword}
      />
    </FormContainer>
  );
};
export default SignUp;
