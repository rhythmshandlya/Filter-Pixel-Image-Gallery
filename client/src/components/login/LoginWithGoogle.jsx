import React from "react";
import GoogleIcon from "../asset/google.svg";

const LoginWithGoogle = () => {
  const googleAuth = () => {
    window.open(`http://localhost:8000/auth/google`, `_self}`);
  };

  return (
    <button
      class="bg-[#c95252] hover:bg-[#d66767] text-white font-bold
                       items-center rounded-lg w-full flex justify-center py-2"
      onClick={googleAuth}
    >
      <img
        src={GoogleIcon}
        alt="Next Icon"
        width={50}
        height={50}
        className="mr-4 rounded-full bg-white text-lg"
      />
      <span className="text-[18px]">Login With Google</span>
    </button>
  );
};

export default LoginWithGoogle;
