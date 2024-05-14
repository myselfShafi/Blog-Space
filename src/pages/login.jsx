import React, { useEffect, useRef, useState } from "react";
import { ArrowDownCircle, Key, Mail } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AuthWrapper } from "../components";
import IconInput from "../components/shared/iconInput";
import { textConfig } from "../config";

const LoginPanel = () => {
  const [sidePanel, setSidePanel] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    ref?.current.focus();
  }, []);

  const togglefgtPwd = () => setSidePanel(!sidePanel);

  return (
    <AuthWrapper>
      <div className="bg-auth-1 auth-div">
        <h2>{textConfig.auth.login}</h2>
        <IconInput
          type="email"
          placeholder="email address"
          wrapperClass="w-full"
          ref={ref}
          disabled={sidePanel}
          icon={<Mail />}
        />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          pwdInput
          icon={<Key className="rotate-90" />}
          disabled={sidePanel}
        />
        <button className="btn-auth" disabled={sidePanel}>
          {textConfig.auth.login}
        </button>
        <button onClick={togglefgtPwd}>
          <h6 className="hover:underline underline-offset-8">
            {textConfig.auth.fgtpwd}
          </h6>
        </button>
      </div>
      <div className="relative bg-auth-2 text-center auth-div">
        <h2 className="hidden md:block">{textConfig.auth.tag3}</h2>
        <h6>{textConfig.auth.tag4}</h6>
        <button className="btn-auth" onClick={() => navigate("/signup")}>
          {textConfig.auth.signup}
        </button>
        <div
          className={`absolute w-full h-fit lg:h-full bottom-0 left-0 text-center auth-div bg-sky-800 dark:bg-fuchsia-950 transition-transform duration-200 ${
            sidePanel ? "-translate-y-1" : "translate-y-full"
          }`}
        >
          <div className="grow w-full auth-div p-0">
            <h2>{textConfig.auth.fgtpwd2}</h2>
            <IconInput
              type="email"
              placeholder={"email address"}
              icon={<Mail />}
              tabIndex={"-1"}
              wrapperClass={"w-full text-left"}
              className={"text-gray-900"}
              label={<p>{textConfig.auth.resetemail}</p>}
            />
            <button tabIndex={"-1"} className="btn-auth">
              {textConfig.auth.continue}
            </button>
          </div>
          <button tabIndex={"-1"} onClick={togglefgtPwd}>
            <ArrowDownCircle />
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginPanel;
