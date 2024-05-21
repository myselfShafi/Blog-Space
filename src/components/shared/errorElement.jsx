import React from "react";
import { AlertTriangle } from "react-feather";

const Error = ({ children, showError, className }) => {
  return (
    <div
      className={`center-element text-red-600 dark:text-rose-300 ${
        showError ? "visible" : "invisible"
      } ${className}`}
    >
      <AlertTriangle className="mr-2 animate-bounce" />
      <p className=" font-semibold">{children}</p>
    </div>
  );
};

export default Error;
