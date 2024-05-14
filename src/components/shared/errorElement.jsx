import React from "react";
import { AlertTriangle } from "react-feather";

const Error = ({ children, showError }) => {
  return (
    <div
      className={`center-element text-red-600 dark:text-rose-200 ${
        showError ? "visible" : "invisible mb-2"
      }`}
    >
      <AlertTriangle className="size-4 mr-2 animate-bounce" />
      <p className=" font-semibold">{children}</p>
    </div>
  );
};

export default Error;
