import React from "react";
import styles from "./Success.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import {  useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import FormContainer from "../../components/FormContainer";

const Success = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate();
  const onHomeClick = ()=>{
    navigate (RoutesList.Home)
  }
  return (
    <FormContainer
      title={"Success"}
      textButton={"Go to home"}
      onButtonClick={onHomeClick}
    >
          <div
            className={classNames(styles.text, {
              [styles.darkText]: isDark,
            })}
          >
            Email confirmed.
            <br />
            Your registration is now completed
          </div>
    </FormContainer>
  );
};

export default Success;
