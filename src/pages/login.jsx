import React, { useState } from "react";
import { ArrowDownCircle, Key, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../appWriteService/auth.service";
import { AuthWrapper, LoadBtn } from "../components";
import { Error } from "../components/shared";
import IconInput from "../components/shared/iconInput";
import { formValidate, textConfig } from "../config";

const LoginPanel = () => {
  const navigate = useNavigate();
  const [sidePanel, setSidePanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglefgtPwd = () => setSidePanel(!sidePanel);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ email: "", password: "" });

  const onLogin = async (data) => {
    setLoading(true);
    try {
      const resp = await authService.login(data);
      console.log({ resp });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <AuthWrapper>
      <form
        noValidate
        autoComplete="off"
        className="bg-auth-1 auth-div"
        onSubmit={handleSubmit(onLogin)}
      >
        <h2>{textConfig.auth.login}</h2>
        <IconInput
          type="email"
          placeholder="email address"
          wrapperClass="w-full"
          icon={<Mail />}
          {...register("email", {
            ...formValidate.email,
            disabled: sidePanel,
          })}
        />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          pwdInput
          icon={<Key className="rotate-90" />}
          {...register("password", {
            ...formValidate.password,
            disabled: sidePanel,
          })}
        />
        <LoadBtn
          isloading={loading}
          className={`btn-auth`}
          type="submit"
          disabled={sidePanel}
        >
          {textConfig.auth.login}
        </LoadBtn>

        <Error showError={Object.entries(errors).length != 0}>
          {Object.values(errors)[0]?.message}
        </Error>

        <button onClick={togglefgtPwd}>
          <h6 className="hover:underline underline-offset-8">
            {textConfig.auth.fgtpwd}
          </h6>
        </button>
      </form>
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
            <LoadBtn tabIndex={"-1"} className="btn-auth">
              {textConfig.auth.continue}
            </LoadBtn>
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
