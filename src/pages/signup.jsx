import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthWrapper } from "../components";
import { IconInput } from "../components/shared";
import { textConfig } from "../config";

const SignupPanel = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    ref?.current.focus();
  }, []);

  return (
    <AuthWrapper>
      <div className="bg-auth-1 p-10 center-element text-center flex-col gap-4 md:order-2">
        <h2>{textConfig.auth.create}</h2>
        <input
          type="text"
          placeholder="full name"
          className="w-full"
          ref={ref}
        />
        <input type="email" placeholder="email address" className="w-full" />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          endIcon
          pwdInput
        />
        <IconInput
          placeholder="confirm password"
          wrapperClass="w-full"
          endIcon
          pwdInput
        />
        <button className="btn-auth">{textConfig.auth.signup}</button>
      </div>
      <div className="bg-auth-2 p-10 text-center center-element flex-col gap-4 md:order-1">
        <h2 className="hidden md:block">{textConfig.auth.tag1}</h2>
        <h6>{textConfig.auth.tag2}</h6>
        <button className="btn-auth" onClick={() => navigate("/login")}>
          {textConfig.auth.login}
        </button>
      </div>
    </AuthWrapper>
  );
};

export default SignupPanel;
