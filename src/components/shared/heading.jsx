import React from "react";

const Heading = ({ children, className }) => {
  return (
    <h4
      className={`font-extrabold tracking-widest p-3 lg:text-center my-10 ${className}`}
    >
      {children}
    </h4>
  );
};

export default Heading;
