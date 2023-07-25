import React from "react";

const CustomHorizontalLine = () => {
  return (
    <div className="flex items-center my-8">
      <hr className="border-line-width border-line-color flex-grow" />
      <span className="mx-4 text-gray-500 font-semibold">OR</span>
      <hr className="border-line-width border-line-color flex-grow" />
    </div>
  );
};

export default CustomHorizontalLine;
