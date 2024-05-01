import React from "react";

const Dropdown = ({ children, title, icon }) => {
  return (
    <div className="relative group/dropdown">
      <div
        className="flex items-center gap-x-2"
        id="dropdown-btn"
        role="button"
        aria-haspopup={true}
      >
        <h5>{title}</h5>
        {icon && icon}
      </div>
      <div
        className="absolute -right-full mt-1 p-10 z-10 w-max origin-top-right border shadow-lg hidden group-hover/dropdown:block bg-white"
        role="menu"
        aria-labelledby="dropdown-btn"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
