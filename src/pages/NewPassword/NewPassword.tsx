import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };
  return (
    <FormContainer
      title={"New password"}
      textButton={"Set password"}
      onButtonClick={() => {}}
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
