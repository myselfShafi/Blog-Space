import React, { useEffect, useState } from "react";
import { Key } from "react-feather";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appWriteService/auth.service";
import { AnimationIcon, AuthWrapper, LoadBtn, LoaderPage } from "../components";
import { Error, IconInput } from "../components/shared";
import { formValidate, textConfig } from "../config";

const ResetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const userID = params.get("userId") || null;
  const secret = params.get("secret") || null;

  const [loading, setLoading] = useState(false);
  const [noAccess, setNoAccess] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userID || !secret) {
      navigate("/error", { replace: true });
    } else {
      setNoAccess(false);
    }
  }, [userID, secret]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
    getValues,
  } = useForm({
    defaultValues: { password: "", cnfPassword: "" },
  });

  const onPwdChange = async (data) => {
    setLoading(true);
    data = { userID, secret, ...data };
    try {
      const resp = await authService.updatePwd(data);
      if (resp.userId) {
        setSuccess(true);
      } else {
        setError("root", {
          type: "manual",
          message: resp || "server error. Try again later.",
        });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  if (noAccess) {
    return <LoaderPage>{textConfig.loaders.authenticate}</LoaderPage>;
  }

  return (
    <AuthWrapper blockRoute>
      <div className="bg-auth-2 text-center auth-div">
        <h2 className="hidden md:block">{textConfig.auth.createPwd}</h2>
        <p>
          <span className="font-bold">Note : </span> {textConfig.auth.note}
        </p>
      </div>
      <div className="bg-auth-1 auth-div">
        {!success ? (
          <form
            className="w-full auth-div p-0"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onPwdChange)}
          >
            <h2>{textConfig.auth.reset}</h2>
            <IconInput
              label={<p>{textConfig.auth.newPwd}</p>}
              placeholder="enter new password"
              wrapperClass="w-full"
              pwdInput
              icon={<Key className="rotate-90" />}
              hasError={errors.password}
              {...register("password", {
                ...formValidate.password,
              })}
            />
            <IconInput
              label={<p>{textConfig.auth.cnfPwd}</p>}
              placeholder="confirm new password"
              wrapperClass="w-full"
              pwdInput
              icon={<Key className="rotate-90" />}
              hasError={errors.cnfPassword}
              {...register("cnfPassword", {
                ...formValidate.password,
                disabled: watch("password") === "",
                validate: {
                  notMatch: (value) => {
                    if (getValues("password") !== value) {
                      return "Passwords do not match";
                    }
                  },
                },
              })}
            />
            <Error showError={Object.entries(errors).length != 0}>
              {Object.values(errors)[0]?.message}
            </Error>
            <LoadBtn
              isloading={loading}
              className={`btn-auth`}
              type="submit"
              disabled={loading}
            >
              {textConfig.auth.signup}
            </LoadBtn>
          </form>
        ) : (
          <div className="w-full text-center  auth-div p-0">
            <AnimationIcon
              src={"/static/check.json"}
              speed={0.4}
              loop
              autoplay
              className={"w-36 h-36"}
            />
            <h2 className="text-teal-500">{textConfig.auth.success}</h2>
            <button
              className="btn-auth w-fit"
              onClick={() => navigate("/login", { replace: true })}
            >
              {textConfig.auth.login2}
            </button>
          </div>
        )}
      </div>
    </AuthWrapper>
  );
};

export default ResetPass;
