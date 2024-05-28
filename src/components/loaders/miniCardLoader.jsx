import React from "react";
import ImageLoader from "./imgLoader";

const MiniCardLoader = ({ hasBg }) => {
  return (
    <div className={`animate-pulse ${hasBg && "bg-shade post-border"}`}>
      <ImageLoader
        className={`w-full h-72 ${hasBg ? "bg-loader" : "bg-shade"}`}
      />
      <div className="p-8 space-y-2">
        <p
          className={`w-[75%] h-4 rounded-lg ${
            hasBg ? "bg-loader" : "bg-shade"
          }`}
        ></p>
        <h6
          className={`w-full h-6 rounded-lg ${
            hasBg ? "bg-loader" : "bg-shade"
          }`}
        ></h6>
        <h6
          className={`w-full h-6 rounded-lg ${
            hasBg ? "bg-loader" : "bg-shade"
          }`}
        ></h6>
        <h6
          className={`w-full h-6 rounded-lg ${
            hasBg ? "bg-loader" : "bg-shade"
          }`}
        ></h6>
      </div>
    </div>
  );
};

export default MiniCardLoader;
