import React, { FC } from "react";
import Title from "../../components/Title";
import styles from "./FormContainer.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../../pages/Router";
import { FormContainerType } from "./types";
import Button from "../Button";
import { ButtonType } from "../../utils/@globalTypes";

const FormContainer: FC<FormContainerType> = ({
  title,
  children,
  textButton,
  onButtonClick,
  submitBtnDisabled,
  footerContent,
}) => {
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
      <Title title={title} />
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.darkInputContainer]: isDark,
          })}
        >
          {children}
          <div className={styles.button}>
            <Button
              title={textButton}
              onClick={onButtonClick}
              disabled={submitBtnDisabled}
              type={ButtonType.Primary}
            />
          </div>
          {footerContent && <>{footerContent}</>}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
