import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderPage from "./loaders/screenLoad";

const AuthRoute = ({ authenticated, children }) => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (pathname === "/user-verification") {
      setLoader(false);
      return;
    } else if (authenticated && status !== authenticated) {
      navigate("/login");
    } else if (!authenticated && status !== authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [loader, status, authenticated]);

  return loader ? <LoaderPage /> : <React.Fragment>{children}</React.Fragment>;
};

export default AuthRoute;
