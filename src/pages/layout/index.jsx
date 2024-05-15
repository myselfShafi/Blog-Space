import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AuthBanner, Footer, Navbar } from "../../components";

const RootLayout = () => {
  const loginStatus = useSelector((state) => state.auth.status);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      {!loginStatus && <AuthBanner />}
      <Footer />
    </div>
  );
};

export default RootLayout;
