import React from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import CustomHorizontalLine from "./CustomHorizontalLine";
import LoginForm from "./LoginForm";

const LoginFormBox = () => {
  return (
    <div className="w-full md:w-[500px]">
      <LoginWithGoogle />
      <CustomHorizontalLine />
      <LoginForm />
    </div>
  );
};

export default LoginFormBox;
