import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { RoutesList } from "src/pages/Router";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onSubmit = () => {
    if (isSubmitted) {
      navigate(RoutesList.Home);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <FormContainer
      title={"Reset password"}
      textButton={isSubmitted ? "Go to home" : "Reset" }
      onButtonClick={onSubmit}
    >
      {isSubmitted ? `You will receive an email ${email} with a link to reset your password!` : null}
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={"Your email"}
        disabled={isSubmitted ?  true : false}
      />
    </FormContainer>
  );
};
export default ResetPassword;
