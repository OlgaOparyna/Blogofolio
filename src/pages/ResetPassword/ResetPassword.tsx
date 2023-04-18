import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { RoutesList } from "src/pages/Router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/reducers/authSlice";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onSubmit = () => {
    if (isSubmitted) {
      dispatch(
        resetPassword({
          data: { email },
          callback: () => navigate(RoutesList.NewPassword),
        })
      );
    } else {
      setSubmitted(true);
    }
  };

  return (
    <FormContainer
      title={"Reset password"}
      textButton={isSubmitted ? "Confirm" : "Reset"}
      onButtonClick={onSubmit}
    >
      {isSubmitted
        ? `You will receive an email ${email} with a link to reset your password!`
        : null}
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={"Your email"}
        disabled={isSubmitted ? true : false}
      />
    </FormContainer>
  );
};
export default ResetPassword;
