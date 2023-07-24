import React from "react";

const LoginForm = () => {
  return (
    <form className="rounded">
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                 text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
      />
      <input
        className="shadow appearance-none border rounded w-full py-4 px-3 mb-8
                   text-white text-xl leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
      />
      <div
        className="rounded-3xs [background:linear-gradient(97.51deg,_#27eecb,_#12d2d2)] 
                      shadow-[0px_7px_20px_rgba(30,_226,_206,_0.25)] flex flex-row py-4 px-6 items-center 
                      justify-center text-base text-secondary-color cursor-pointer"
      >
        <b className="relative leading-[24px]">Submit</b>
      </div>
    </form>
  );
};

export default LoginForm;
