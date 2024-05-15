import React from "react";
import { Loader } from "react-feather";

const LoadBtn = ({ children, isloading, ...props }) => {
  return (
    <button {...props}>
      {isloading ? <Loader className="animate-spin mx-auto" /> : children}
    </button>
  );
};

export default LoadBtn;
