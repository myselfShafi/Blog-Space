import React from "react";
import { Loader } from "react-feather";

const CardLoader = () => {
  return (
    <div className="center-element w-full h-52 animate-pulse bg-gray-50 dark:bg-gray-950 mt-10 lg:mt-16">
      <Loader className="animate-spin size-10" />
    </div>
  );
};

export default CardLoader;
