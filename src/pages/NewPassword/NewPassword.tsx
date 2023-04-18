import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "src/components/Input";
import FormContainer from "src/components/FormContainer";
import { newPassword} from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };
  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        newPassword({
          data: { uid, token, new_password: password },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };
  return (
    <FormContainer
      title={"New password"}
      textButton={"Set password"}
      onButtonClick={onSubmit}
    >
      <Input
        value={password}
        onChange={onChangePassword}
        type={"password"}
        title="Password"
        placeholder="Your password"
      />
      <Input
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        type={"password"}
        title="Confirm password"
        placeholder="Confirm your password"
      />
    </FormContainer>
  );
};
export default NewPassword;
