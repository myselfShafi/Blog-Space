import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appWriteService/auth.service";
import { AnimationIcon, AuthWrapper } from "../components";
import { Error } from "../components/shared";
import { textConfig } from "../config";

const VerifyUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const params = new URLSearchParams(location.search);
  const userID = params.get("userId") || null;
  const secret = params.get("secret") || null;

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const verify = useRef(false);

  useEffect(() => {
    if (!userID || !secret) {
      navigate("/login", { replace: true });
    }
    if (userID && secret && !verify.current) {
      verify.current = true;
      checkAcc();
    }
  }, []);

  const checkAcc = async () => {
    try {
      const resp = await authService.verifyEmail({ userID, secret });
      if (resp) {
        setChecked(true);
      } else {
        setError(resp);
      }
    } catch (error) {
      setError(error.message + " Try later or Contact support.");
    }
  };

  return (
    <AuthWrapper blockRoute>
      <div className="bg-auth-1 auth-div col-span-2 text-center lg:w-[30rem]">
        <AnimationIcon
          src={`/static/${
            error ? "error" : checked ? "check" : "verifying"
          }.json`}
          speed={0.4}
          loop
          autoplay
          className={"w-36 h-36"}
        />
        {!error &&
          (checked ? (
            <>
              <h2 className="text-teal-500">{textConfig.auth.verified}</h2>
              <p className="text-teal-500">{textConfig.auth.verified2}</p>
              <button
                className="btn-auth w-fit"
                onClick={() => navigate("/login", { replace: true })}
              >
                {textConfig.auth.login2}
              </button>{" "}
            </>
          ) : (
            <h2 className="animate-pulse">{textConfig.auth.verifying}</h2>
          ))}
        <Error showError={error}>{error}</Error>
      </div>
    </AuthWrapper>
  );
};

export default VerifyUser;
