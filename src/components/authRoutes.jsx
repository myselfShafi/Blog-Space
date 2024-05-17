import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoaderPage from "./loaders/screenLoad";

const AuthRoute = ({ authenticated, children }) => {
  const loginStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authenticated && loginStatus !== authenticated) {
      navigate("/login");
    } else if (!authenticated && loginStatus !== authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [loader, loginStatus, authenticated]);

  return loader ? <LoaderPage /> : <React.Fragment>{children}</React.Fragment>;
};

export default AuthRoute;
