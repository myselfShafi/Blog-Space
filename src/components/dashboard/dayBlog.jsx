import React from "react";
import { textConfig } from "../../config";

const DayBlog = () => {
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="container p-0 overflow-hidden">
      <h4 className="font-extrabold tracking-widest text-center">
        {textConfig.dashboard.dayBlog}
      </h4>
      <a href="">
        <div className="relative my-10 h-[40rem] overflow-hidden group/wrapper">
          <div className="h-full bg-[url(https://images.unsplash.com/photo-1714906472874-63482f7cef44)] bg-cover bg-center group-hover/wrapper:scale-105 transition-transform duration-200"></div>
          <div className="absolute top-0 left-0 h-full w-full opacity-50 group-hover/wrapper:opacity-100 group-hover/wrapper:backdrop-blur-sm p-10 lg:p-16 flex flex-col justify-end transition delay-100">
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
      </a>
    </div>
  );
};

export default DayBlog;
