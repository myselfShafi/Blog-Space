import React from "react";

const Dropdown = ({
  id = "dropdown-btn",
  children,
  title,
  icon,
  classes,
  optionClass,
  isOpen,
  hover = false,
}) => {
  return (
    <div className={`relative ${hover && "group/dropdown"} ${classes}`}>
      <div
        className="flex items-center gap-x-2"
        id={id}
        role="button"
        aria-haspopup={true}
      >
        {typeof title === "string" ? <h6>{title}</h6> : title}
        {icon && icon}
      </div>
      <div
        className={`absolute z-10 origin-top-right border dark:border-gray-900 shadow-lg dark:shadow-slate-950 ${
          !isOpen && "hidden"
        }  bg-white dark:bg-gray-900  ${
          hover && "hidden group-hover/dropdown:block"
        } ${optionClass}`}
        role="menu"
        aria-labelledby={id}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
