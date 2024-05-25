import React from "react";

const UserDataLoader = () => {
  return (
    <div className="relative grow center-element flex-col gap-y-2 animate-pulse">
      <h5 className="h-6 w-full lg:w-2/5 rounded-lg bg-loader"></h5>
      <div className="w-full lg:flex justify-center gap-x-3">
        <h6 className="h-6 lg:w-2/5 rounded-lg bg-loader"></h6>
        <h6 className="h-6 lg:w-2/5 rounded-lg bg-loader"></h6>
      </div>
      <h5 className="h-6 w-full lg:w-2/5 rounded-lg bg-loader"></h5>
    </div>
  );
};

export default UserDataLoader;
