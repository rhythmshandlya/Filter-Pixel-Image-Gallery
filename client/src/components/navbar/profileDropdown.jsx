import React, { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../DarkModeSwitch";

const DropdownMenu = ({ icon }) => {
  const { setAuth } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Picture Icon */}
      <button
        onClick={toggleDropdown}
        className="rounded-full focus:outline-none"
      >
        <img
          src={icon}
          alt="User Icon"
          className="w-16 h-16 object-cover rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg">
          <div className="py-1">
            <div
              className="px-4 py-3 hover:bg-white hover:text-black cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setAuth({});
                navigate("/login");
              }}
            >
              Logout
            </div>

            <div className="px-4 py-3 hover:bg-white hover:text-black cursor-pointer">
              <ToggleButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
