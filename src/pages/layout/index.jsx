import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components";

const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
