import React, { useState } from "react";
import { Key, Mail, User } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../appWriteService";
import { AnimationIcon, AuthWrapper, LoadBtn } from "../components";
import ImageLoader from "../components/loaders/imgLoader";
import { Error, IconInput } from "../components/shared";
import { formValidate, textConfig } from "../config";
import { authlogin } from "../store/slices/authSlice";

const SignupPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sidePanel, setSidePanel] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { fullname: "", email: "", password: "", cnfPassword: "" },
  });

  const onSignup = async (data) => {
    setLoading(true);
    data = { name: data.fullname, email: data.email, password: data.password };
    try {
      const resp = await authService.createAccount(data);
      if (resp) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setSidePanel(true);
          setTimeout(() => {
            navigate("/", { replace: true });
            dispatch(authlogin(userData));
          }, 5000);
        }
      } else {
        setError("root", { type: "manual", message: resp || "server error" });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  return (
    <AuthWrapper>
      <form
        noValidate
        autoComplete="off"
        className="relative bg-auth-1 auth-div text-center md:order-2"
        onSubmit={handleSubmit(onSignup)}
      >
        <h2>{textConfig.auth.create}</h2>
        <IconInput
          type="text"
          icon={<User />}
          placeholder="full name"
          hasError={errors.fullname}
          wrapperClass="w-full"
          {...register("fullname", {
            ...formValidate.textOnly,
            required: "Full name is required",
          })}
        />
        <IconInput
          type="email"
          placeholder={"email address"}
          icon={<Mail />}
          wrapperClass={"w-full text-left"}
          hasError={errors.email}
          {...register("email", { ...formValidate.email })}
        />
        <IconInput
          placeholder="password"
          wrapperClass="w-full"
          pwdInput
          icon={<Key className="rotate-90" />}
          hasError={errors.password}
          {...register("password", { ...formValidate.password })}
        />
        <IconInput
          placeholder="confirm password"
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
        {sidePanel && <ImageLoader />}
      </form>
      <div className="relative bg-auth-2 auth-div text-center md:order-1">
        <h2 className="hidden md:block">{textConfig.auth.tag1}</h2>
        <h6>{textConfig.auth.tag2}</h6>
        <button
          className="btn-auth"
          type="button"
          onClick={() => navigate("/login")}
        >
          {textConfig.auth.login}
        </button>
        <div
          className={`absolute w-full h-fit lg:h-full bottom-0 left-0 text-center auth-div gap-y-0 bg-sky-700 dark:bg-fuchsia-950 transition-transform duration-200 ${
            sidePanel ? "-translate-y-1" : "translate-y-full"
          }`}
        >
          <AnimationIcon
            speed={0.4}
            src={"/static/check.json"}
            loop
            autoplay
            className={"w-32 h-32 animate-bounce"}
          />
          <h2 className="mb-3">{textConfig.auth.registered}</h2>
          <h6>{textConfig.postEdit.success}</h6>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignupPanel;
