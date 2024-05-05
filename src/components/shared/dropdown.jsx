import React from "react";

const Dropdown = ({ children, title, icon, classes }) => {
  return (
    <div className={`relative group/dropdown ${classes}`}>
      <div
        className="flex items-center gap-x-2"
        id="dropdown-btn"
        role="button"
        aria-haspopup={true}
      >
        <h6>{title}</h6>
        {icon && icon}
      </div>
      <div
        className="absolute -right-full p-10 z-10 w-max origin-top-right border dark:border-gray-900 shadow-lg dark:shadow-slate-950 hidden group-hover/dropdown:block bg-white dark:bg-gray-900"
        role="menu"
        aria-labelledby="dropdown-btn"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
