import React from "react";

const Limits = ({ limit, handleLimitChange }) => {
  return (
    <div>
      <select
        className="ml-2 px-2 py-1 text-[24px] bg-white text-gray-600 border rounded focus:outline-none focus:ring focus:border-indigo-300"
        value={limit}
        onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele) => {
          if (ele === 10)
            return (
              <option value={ele} className="text-[20px]">
                ∞
              </option>
            );
          return <option value={ele}>{ele}</option>;
        })}
        {/* Add more options based on your requirements */}
      </select>
    </div>
  );
};

export default Limits;
