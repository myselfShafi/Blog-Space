import React from "react";
import { Loader } from "react-feather";

const LoadBtn = ({ children, className, isloading, ...props }) => {
  return (
    <button
      className={`${isloading && "pointer-events-none"} ${className}`}
      {...props}
    >
      {isloading ? <Loader className="animate-spin mx-auto" /> : children}
    </button>
  );
};

export default LoadBtn;
