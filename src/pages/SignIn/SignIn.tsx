import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
//import * as yup from "yup";
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //const [validationError, setValidationError] = useState({});

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
  const onForgotPasswordClick = () => {
    navigate(RoutesList.ResetPassword);
  };
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  useEffect(() => {
    if (email.length === 0) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [password]);

  // useEffect(() => {
  //   const schema = yup.object().shape({
  //     email: yup.string().required("Почта это обязательное поле"),
  //     password: yup.string().required("Пароль должен быть больше 8 символов").min(8),
  //   });
  //   const validator = async () => {
  //     const validationResalt = await schema
  //       .validate(
  //       { email, password },
  //       { abortEarly: false }
  //     )
  //     .catch((err:any)=>{
  //       let errorObject: any = {};
  //       err.inner.map((error:any)=>{
  //         const errorPath = `${error.path}`;
  //         errorObject[errorPath] = error.errors;
  //       });
  //       setValidationError(errorObject)
  //     });
  //     validationResalt && setValidationError({})
  //   };
  //   validator();
  // }, [email, password]);

  const isValid = useMemo(() => {
    return emailError.length === 0 && passwordError.length === 0;
  }, [emailError, passwordError]);
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
      submitBtnDisabled={!isValid}
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
        onClick={onForgotPasswordClick}
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
