import React from "react";

const MainContainer = ({ children, className }) => {
  return (
    <div className={`container 2xl:max-w-[80%] my-20 lg:my-40 ${className}`}>
      {children}
    </div>
  );
};

export default MainContainer;
