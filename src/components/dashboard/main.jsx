import React from "react";
import { textConfig } from "../../config";
import { BlogCard } from "../shared";

const Dashboard = () => {
  return (
    <div>
      <div className="h-screen bg-gradient-light dark:bg-gradient-dark"></div>
      <div className="container">
        <h5 className="text-center font-bold lg:divider-center">
          {textConfig.dashboard.article}
        </h5>
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
