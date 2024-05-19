import React from "react";
import { useSelector } from "react-redux";

const MainContainer = ({ children, className }) => {
  const { status, userData } = useSelector((state) => state.auth);

  return (
    <div
      className={`container ${
        !userData?.emailVerification && status
          ? "mt-32 mb-20 lg:mt-52 lg:mb-40"
          : "my-20 lg:my-40"
      }  ${className}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
