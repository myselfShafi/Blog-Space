import React from "react";

const MainContainer = ({ children, className }) => {
  return (
    <div className={`container my-20 lg:my-40 ${className}`}>{children}</div>
  );
};

export default MainContainer;
