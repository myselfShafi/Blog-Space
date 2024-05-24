import React from "react";

const BlogCardLoader = () => {
  return (
    <div className="lg:flex container p-5 lg:w-11/12 2xl:w-full animate-pulse">
      <div className="flex-none h-80 lg:w-120 lg:h-96 2xl:h-[22rem] relative bg-loader"></div>
      <div className="py-3 px-6 space-y-4 w-full">
        <h6 className="h-9 w-32 rounded-lg bg-loader"></h6>
        <div className="space-y-2">
          <h5 className="h-6 w-56 rounded-lg bg-loader"></h5>
          <h5 className="h-6 w-48 rounded-lg bg-loader"></h5>
        </div>
        <div className="space-y-2">
          <p className="h-5 w-full rounded-lg bg-loader"></p>
          <p className="h-5 w-full rounded-lg bg-loader"></p>
          <p className="h-5 w-full rounded-lg bg-loader"></p>
        </div>
        <div className="pt-10 flex gap-x-4">
          <p className="h-6 w-32 rounded-lg bg-loader"></p>
          <p className="h-6 w-32 rounded-lg bg-loader"></p>
        </div>
      </div>
    </div>
  );
};

export default BlogCardLoader;
