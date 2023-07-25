import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post("/auth/login", {
        email: username,
        password,
      });
      if (!res.data) return;
      setAuth({
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axiosPrivate.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="rounded" onSubmit={handleSubmit}>
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                 text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Email"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                   text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        type="submit"
        className="rounded-3xs [background:linear-gradient(97.51deg,_#27eecb,_#12d2d2)] 
                      shadow-[0px_7px_20px_rgba(30,_226,_206,_0.25)] flex flex-row py-4 px-8 items-center 
                      justify-center text-xl text-secondary-color  cursor-pointer w-fit mx-auto 
                      rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
