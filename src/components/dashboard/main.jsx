import React from "react";
import { textConfig } from "../../config";
import { BlogCard } from "../shared";
import DayBlog from "./dayBlog";

const Dashboard = () => {
  return (
    <div>
      <div className="h-[calc(100vh-5rem)] bg-gradient-light dark:bg-gradient-dark pt-20 lg:pt-40 flex flex-col items-center justify-center text-center px-3">
        <h5 className=" font-bold leading-[3] text-stone-800 dark:text-violet-200">
          {textConfig.dashboard.title[0]}
          <span className=" text-6xl lg:text-8xl font-extrabold">
            {textConfig.dashboard.title[1]}
          </span>
          {textConfig.dashboard.title[4]}
          <br />
          To{" "}
          <span className=" text-6xl lg:text-8xl font-extrabold">
            {textConfig.dashboard.title[3]}
          </span>
          {textConfig.dashboard.title[4]}
        </h5>
        <h4 className="my-6 font-comic-neue">
          {textConfig.dashboard.subtitle}
        </h4>
        <h6 className="my-2 tracking-widest leading-loose">
          {textConfig.dashboard.tag[0]}
          <span className="bg-pink-600/50 p-1 rounded-md text-slate-50">
            {textConfig.dashboard.tag[1]}
          </span>
          {textConfig.dashboard.tag[2]}
        </h6>
      </div>
      <DayBlog />
      <div className="container my-32">
        <h4 className="font-extrabold tracking-widest text-center">
          {textConfig.dashboard.article}
        </h4>
        <div className="my-10">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
