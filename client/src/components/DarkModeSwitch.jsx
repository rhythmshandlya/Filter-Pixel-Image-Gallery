// ToggleButton.js
import React from "react";
import { useDarkMode } from "../context/darkModeContext";

const ToggleButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className={`relative inline-block w-10 h-6 transition-all duration-200 ease-linear ${
        darkMode ? "bg-gray-600" : "bg-gray-300"
      } rounded-full focus:outline-none`}
      onClick={toggleDarkMode}
    >
      <span
        className={`block w-4 h-4 transition-all duration-200 ease-linear transform ${
          darkMode ? "translate-x-4 bg-white" : "translate-x-0 bg-gray-400"
        } rounded-full`}
      />
    </button>
  );
};

export default ToggleButton;
