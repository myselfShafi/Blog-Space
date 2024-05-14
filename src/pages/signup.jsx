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
      <div className="bg-gray-800 p-10 text-center center-element flex-col gap-4">
        <h2>{textConfig.auth.tag1}</h2>
        <p>{textConfig.auth.tag2}</p>
        <button className="btn-auth" onClick={() => navigate("/login")}>
          {textConfig.auth.login}
        </button>
      </div>
      <div className="bg-blue-200 p-10 center-element flex-col gap-4">
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
    </AuthWrapper>
  );
};

export default SignupPanel;
