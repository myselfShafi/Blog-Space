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
      <div className={"grow center-element"}>
        <div
          className="w-full h-full rounded-lg overflow-hidden max-w-[60rem] max-h-[32rem] grid xl:grid-cols-2"
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
