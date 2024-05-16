import React, { useState } from "react";
import { Key, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appWriteService/auth.service";
import { AuthWrapper, ForgotPass, LoadBtn } from "../components";
import { Error } from "../components/shared";
import IconInput from "../components/shared/iconInput";
import { formValidate, textConfig } from "../config";
import { authlogin } from "../store/slices/authSlice";

const LoginPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sidePanel, setSidePanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: { email: "abc@gmail.com", password: "qwertyuiop" },
  });

  const togglefgtPwd = () => {
    setSidePanel(!sidePanel);
  };

  const onLogin = async (data) => {
    clearErrors();
    setLoading(true);
    try {
      const resp = await authService.login(data);
      if (resp) {
        const userData = await authService.getCurrentUser();
        setLoading(false);
        if (userData) {
          dispatch(authlogin(userData));
          navigate("/", { replace: true });
        }
      } else {
        setError("root", { type: "manual", message: resp });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="bg-auth-1 auth-div">
        <form
          className="w-full auth-div p-0 grow"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onLogin)}
        >
          <h2>{textConfig.auth.login}</h2>
          <IconInput
            type="email"
            placeholder="email address"
            wrapperClass="w-full"
            icon={<Mail />}
            hasError={errors.email}
            {...register("email", {
              ...formValidate.email,
              disabled: sidePanel,
              onBlur: () => clearErrors(),
            })}
          />
          <IconInput
            placeholder="password"
            wrapperClass="w-full"
            pwdInput
            icon={<Key className="rotate-90" />}
            hasError={errors.password}
            {...register("password", {
              ...formValidate.password,
              disabled: sidePanel,
              onBlur: () => clearErrors(),
            })}
          />
          <LoadBtn
            isloading={loading}
            className={`btn-auth`}
            type="submit"
            disabled={loading || sidePanel}
          >
            {textConfig.auth.login}
          </LoadBtn>

          <Error showError={Object.entries(errors).length != 0}>
            {Object.values(errors)[0]?.message}
          </Error>
        </form>
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
        <ForgotPass sidePanel={sidePanel} togglefgtPwd={togglefgtPwd} />
      </div>
    </AuthWrapper>
  );
};

export default LoginPanel;
