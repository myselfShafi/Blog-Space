import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { AuthBanner, Footer, Navbar } from "../../components";

const RootLayout = () => {
  const { status } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

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
