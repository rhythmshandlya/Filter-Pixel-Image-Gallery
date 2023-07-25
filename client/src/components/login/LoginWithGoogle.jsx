import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosPrivate } from "../../api/axios";

const LoginWithGoogle = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.viaGoogle) navigate("/");
  });

  return (
    <GoogleLogin
      size="large"
      shape="rectangular"
      width="500px"
      theme="filled_black"
      logo_alignment="center"
      useOneTap={true}
      onSuccess={async (googleAuthCredentials) => {
        console.log(googleAuthCredentials);
        try {
          const res = await axiosPrivate.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
            {
              token: googleAuthCredentials.credential,
            }
          );
          console.log(res.data);
          setAuth({
            token: res.data.token,
            user: res.data.user,
            isAuthenticated: true,
            viaGoogle: true,
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          axiosPrivate.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          navigate("/");
        } catch (e) {
          navigate("/login");
        }
      }}
      onError={() => {
        console.log("Try login with id and password!");
      }}
    />
  );
};

export default LoginWithGoogle;
