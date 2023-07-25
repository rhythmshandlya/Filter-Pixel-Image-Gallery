import { useNavigate } from "react-router-dom";
import FilterIcon from "../filterIcon";
import useAuth from "../../hooks/useAuth";
import DropdownMenu from "./profileDropdown";

const Navbar = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleClick = () => {
    if (isLoginPage) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between px-16 py-2 text-white">
      {/* Icon on the left */}
      <div>
        <FilterIcon />
      </div>

      {auth.isAuthenticated ? (
        <h1>{<DropdownMenu icon={auth.user.dp} />}</h1>
      ) : (
        <button
          className="px-6 py-4 bg-white text-black rounded-xl font-inter 
                         text-base font-semibold cursor-pointer"
          onClick={handleClick} // Add the onClick event here
        >
          {isLoginPage ? "Signup" : "Login"}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
