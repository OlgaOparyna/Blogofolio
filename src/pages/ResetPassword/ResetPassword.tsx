import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <FormContainer
      title={"Reset password"}
      textButton={"Reset"}
      onButtonClick={() => {}}
    >
      <Input
        title={"Email"}
        value={email}
        onChange={onChangeEmail}
        placeholder={"Your email"}
      />
    </FormContainer>
  );
};
export default ResetPassword;
