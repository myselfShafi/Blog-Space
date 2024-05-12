import React from "react";
import { Link } from "react-router-dom";
import { textConfig } from "../../config";
import { MainContainer } from "../shared";

const AuthBanner = () => {
  return (
    <MainContainer className={"tracking-widest"}>
      <h2 className="text-center lg:w-3/4 mx-auto">
        {textConfig.banner.line1}
      </h2>
      <h2 className="text-center font-extrabold my-4">
        <Link
          to={"/login"}
          className="text-rose-500 hover:underline underline-offset-8"
        >
          {textConfig.auth.login}
        </Link>{" "}
        |{" "}
        <Link
          to={"/signup"}
          className="text-rose-500 hover:underline underline-offset-8"
        >
          {textConfig.auth.signup}
        </Link>
      </h2>
      <h2 className="text-center lg:w-3/4 mx-auto ">
        {textConfig.banner.line2}
      </h2>
    </MainContainer>
  );
};

export default AuthBanner;
