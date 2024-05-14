import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { AuthWrapper } from "../components";
import IconInput from "../components/shared/iconInput";
import { textConfig } from "../config";

const LoginPanel = () => {
  const [mask, setMask] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    ref?.current.focus();
  }, []);

  return (
    <AuthWrapper>
      <div className="w-full h-full rounded-lg overflow-hidden max-w-[60rem] max-h-[30rem] grid xl:grid-cols-2">
        <div className="bg-blue-200 p-10 center-element flex-col gap-4">
          <h2>{textConfig.auth.login}</h2>
          <input
            type="email"
            placeholder="email address"
            className="w-full"
            ref={ref}
          />
          <IconInput
            type={mask ? "password" : "text"}
            placeholder="password"
            wrapperClass="w-full"
            endIcon
            icon={
              <button onClick={() => setMask(!mask)}>
                {mask ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
          />
          <button className="btn-auth">{textConfig.auth.login}</button>
          <a href="#" className="hover:underline underline-offset-8">
            {textConfig.auth.fgtpwd}
          </a>
        </div>
        <div className="bg-gray-800 p-10 text-center center-element flex-col gap-4">
          <h2>Hello, Friend!</h2>
          <p>
            Dont have an account? Fill in your details and start blogging now ..
          </p>

          <button className="btn-auth">{textConfig.auth.signup}</button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginPanel;
