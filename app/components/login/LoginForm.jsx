import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

const LoginForm = () => {
  const { session } = useSession();
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
    // Here you can perform your login logic using the provided username and password
    // For simplicity, let's just log the values to the console for now
    console.log("Username:", username);
    console.log("Password:", password);
    // You can now perform your login logic, like calling an API endpoint to authenticate the user.
    const res = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return !session?.user ? (
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
  ) : (
    <>
      <div>Hello World</div>
    </>
  );
};

export default LoginForm;
