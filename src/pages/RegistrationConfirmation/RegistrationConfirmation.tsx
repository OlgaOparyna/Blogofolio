import React from "react";
import styles from "./RegistrationConfirmation.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";
import { useDispatch } from "react-redux";
import { activateUser } from "../../redux/reducers/authSlice";
import FormContainer from "../../components/FormContainer";

const RegistrationConfirmation = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const onConfirmButtonClick = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.Success),
        })
      );
    }
  };
  return (
    <FormContainer
      title={"Registration Confirmation"}
      textButton={"Confirm"}
      onButtonClick={onConfirmButtonClick}
    >
          <div
            className={classNames(styles.text, {
              [styles.darkText]: isDark,
            })}
          >
            Please activate your account with the activation link in the email
            <br/>Please, check your email
          </div>
    </FormContainer>
  );
};

export default RegistrationConfirmation;
