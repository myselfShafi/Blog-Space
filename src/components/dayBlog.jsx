import React from "react";
import { Link } from "react-router-dom";
import { textConfig } from "../config";
import { Heading } from "./shared";

const DayBlog = () => {
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const category = "nature";
  const postId = "af3t4ge5gerg5fgty7k8";

  const url = "https://images.unsplash.com/photo-1561154464-82e9adf32764";

  return (
    <div className="p-0 overflow-hidden">
      <Heading>{textConfig.dashboard.dayBlog}</Heading>
      <Link to={`/all-category/${category}/${postId}`}>
        <div className="relative my-10 h-[40rem] overflow-hidden group/wrapper">
          <div
            className="h-full bg-cover bg-center group-hover/wrapper:scale-105 transition-transform duration-200 shadow-inner-3xl"
            style={{ backgroundImage: `url(${url})` }}
          ></div>
          <div className="absolute top-0 left-0 h-full w-full lg:opacity-50 group-hover/wrapper:opacity-100 group-hover/wrapper:backdrop-blur-sm p-10 lg:p-16 flex flex-col justify-end transition delay-100">
            <div className="text-white space-y-4">
              <h6 className="px-2 bg-red-700 w-fit uppercase font-extrabold">
                Nature
              </h6>
              <h2 className="max-w-[85%]">
                iPad Pro M1 Chip: Bringing The MacBook Pro Power
              </h2>
              <h6 className="font-extralight">
                by <span className="font-bold">John Doe</span> - {date}
              </h6>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DayBlog;
