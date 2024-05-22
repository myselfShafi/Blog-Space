import React from "react";

const LoaderPage = ({ children }) => {
  return (
    <div className="h-screen center-element flex-col gap-y-4">
      <span className="load"></span>
      {typeof children === "string" ? (
        <h6 className="animate-pulse font-bold">{children}</h6>
      ) : (
        children
      )}
    </div>
  );
};

export default LoaderPage;
