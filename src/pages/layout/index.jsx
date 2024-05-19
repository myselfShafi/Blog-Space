import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AuthBanner, Footer, Navbar } from "../../components";

const RootLayout = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <div className="relative h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      {!status && <AuthBanner />}
      <Footer />
    </div>
  );
};

export default RootLayout;
