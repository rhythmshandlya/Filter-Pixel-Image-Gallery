import { useState } from "react";

const SwitchableTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex">
        <div
          className={`flex-1 text-center py-3 ${
            activeTab === 1 ? "bg-white text-black" : "text-white"
          } rounded-t-full cursor-pointer`}
          onClick={() => handleTabClick(1)}
        >
          S3
        </div>
        <div
          className={`flex-1 text-center py-2 ${
            activeTab === 2 ? "bg-white text-black" : "text-white"
          } rounded-t-full cursor-pointer`}
          onClick={() => handleTabClick(2)}
        >
          Google Drive
        </div>
      </div>
      <div style={{ borderBottom: "2px solid white" }}></div>
      <div className="rounded-b-lg mt-4">
        {children?.map((child, index) => {
          return (
            <div
              className={`p-4 ${
                activeTab === index + 1 ? "block" : "hidden"
              } transition-opacity duration-300`}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwitchableTabs;
