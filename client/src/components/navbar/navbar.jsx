import FilterIcon from "../filterIcon";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-16 py-2 text-white">
      {/* Icon on the left */}
      <div>
        <FilterIcon />
      </div>

      {/* Button on the right */}
      <button
        className="px-6 py-4 bg-white text-black rounded-xl font-inter 
                         text-base font-semibold cursor-pointer"
      >
        Sign Up
      </button>
    </nav>
  );
};

export default Navbar;
