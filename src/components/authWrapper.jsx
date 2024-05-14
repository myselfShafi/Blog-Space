import React from "react";
import { Link } from "react-router-dom";
import { textConfig } from "../config";

const AuthWrapper = ({ children, ...props }) => {
  return (
    <div
      className={`h-screen flex flex-col bg-gradient-light dark:bg-gradient-dark`}
    >
      <Link to={"/"}>
        <h1 className="text-pink-700 text-center pt-10">{textConfig.title}</h1>
      </Link>
      <div className={"grow center-element"} {...props}>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
