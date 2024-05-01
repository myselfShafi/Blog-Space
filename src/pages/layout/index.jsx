import React from "react";
import { Footer, Navbar } from "../../components";

const RootLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
