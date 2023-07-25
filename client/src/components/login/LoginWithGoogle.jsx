import React from "react";
import GoogleIcon from "../asset/google.svg";

const LoginWithGoogle = () => {
  return (
    <button
      class="bg-[#c95252] hover:bg-[#d66767] text-white font-bold
                       items-center rounded-lg w-full flex justify-center py-2"
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
