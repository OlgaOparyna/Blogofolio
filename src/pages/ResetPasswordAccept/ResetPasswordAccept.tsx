import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";
import { useNavigate } from "react-router-dom";
import User from "src/components/User";

const ResetPasswordAccept = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const navigate = useNavigate();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const userName = useSelector(AuthSelectors.getUserName);
   const onButtonHomeClick = () => {
    navigate(RoutesList.Home);
  };
  return (
    <FormContainer
      title={"Reset password"}
      textButton={"Go to home"}
      onButtonClick={onButtonHomeClick}
    >
      <div>
        {isLoggedIn &&
          userName &&
          `You will receive an email ${userName.email} with a link to reset your password!`}
      </div>
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={`${isLoggedIn && userName && userName.email}`}
      />
    </FormContainer>
  );
};
export default ResetPasswordAccept;
