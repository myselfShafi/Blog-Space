import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthWrapper } from "../components";
import IconInput from "../components/shared/iconInput";
import { textConfig } from "../config";

const LoginPanel = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    ref?.current.focus();
  }, []);

  return (
    <AuthWrapper>
      <div className="bg-auth-1 p-10 center-element flex-col gap-4">
        <h2>{textConfig.auth.login}</h2>
        <input
          type="email"
          placeholder="email address"
          className="w-full"
          ref={ref}
        />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          endIcon
          pwdInput
        />
        <button className="btn-auth">{textConfig.auth.login}</button>
        <a href="#" className="hover:underline underline-offset-8">
          {textConfig.auth.fgtpwd}
        </a>
      </div>
      <div className="bg-auth-2 p-10 text-center center-element flex-col gap-4">
        <h2 className="hidden md:block">{textConfig.auth.tag3}</h2>
        <h6>{textConfig.auth.tag4}</h6>
        <button className="btn-auth" onClick={() => navigate("/signup")}>
          {textConfig.auth.signup}
        </button>
      </div>
    </AuthWrapper>
  );
};

export default LoginPanel;
