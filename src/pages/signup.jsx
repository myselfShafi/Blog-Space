import React, { useEffect, useRef } from "react";
import { Key, Mail, User } from "react-feather";
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
      <div className="bg-auth-1 auth-div text-center md:order-2">
        <h2>{textConfig.auth.create}</h2>
        <IconInput
          type="text"
          icon={<User />}
          placeholder="full name"
          wrapperClass="w-full"
          ref={ref}
        />
        <IconInput
          type="email"
          placeholder={"email address"}
          icon={<Mail />}
          wrapperClass={"w-full text-left"}
          className={"text-gray-900"}
        />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          pwdInput
          icon={<Key className="rotate-90" />}
        />
        <IconInput
          placeholder="confirm password"
          wrapperClass="w-full"
          pwdInput
          icon={<Key className="rotate-90" />}
        />
        <button className="btn-auth">{textConfig.auth.signup}</button>
      </div>
      <div className="bg-auth-2 auth-div text-center md:order-1">
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
