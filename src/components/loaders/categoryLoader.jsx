import React from "react";

const CategoryLoader = () => {
  return (
    <div className="bg-shade mb-10 lg:mb-16 animate-pulse break-inside-avoid">
      <div className="h-72 lg:h-80 w-full bg-loader"></div>
      <div className="p-8 space-y-2 lg:space-y-4">
        <h6 className="h-10 w-full rounded-lg bg-loader"></h6>
        <p className="h-4 w-1/2 rounded-lg bg-loader"></p>
        <div className="space-y-1 lg:space-y-2">
          <h6 className="h-4 rounded-lg bg-loader"></h6>
          <h6 className="h-4 rounded-lg bg-loader"></h6>
          <h6 className="h-4 rounded-lg bg-loader"></h6>
        </div>
        <p className="h-4 w-1/2 rounded-lg bg-loader mx-auto"></p>
      </div>
    </div>
  );
};

export default CategoryLoader;
