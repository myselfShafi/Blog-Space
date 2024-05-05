import React from "react";
import { textConfig } from "../../config";
import { BlogCard } from "../shared";

const Dashboard = () => {
  return (
    <div className="container">
      <h5 className="text-center font-bold lg:divider-center">
        {textConfig.dashboard.article}
      </h5>
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default Dashboard;
