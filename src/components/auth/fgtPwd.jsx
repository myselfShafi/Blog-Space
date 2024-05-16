import React, { useState } from "react";
import { ArrowDownCircle, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import authService from "../../appWriteService/auth.service";
import { formValidate, textConfig } from "../../config";
import LoadBtn from "../loaders/loaderButton";
import { Error, IconInput } from "../shared";

const ForgotPass = ({ sidePanel, togglefgtPwd }) => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  const passEmail = async ({ email }) => {
    console.log({ email });
    setLoading(true);
    try {
      const resp = await authService.resetEmail({
        email,
        resetURL: "/sampleurl.com",
      });
      console.log({ resp });
      if (resp) {
        alert("email sent...");
      } else {
        setError("root", { type: "manual", message: resp });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(passEmail)}
      className={`absolute w-full h-fit lg:h-full bottom-0 left-0 text-center auth-div bg-sky-700 dark:bg-fuchsia-950 transition-transform duration-200 ${
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
          hasError={errors.email}
          wrapperClass={"w-full text-left"}
          className={"text-gray-900"}
          label={<p>{textConfig.auth.resetemail}</p>}
          {...register("email", {
            ...formValidate.email,
            onBlur: () => clearErrors(),
          })}
        />
        <LoadBtn
          isloading={loading}
          type={"submit"}
          tabIndex={"-1"}
          className="btn-auth"
        >
          {textConfig.auth.continue}
        </LoadBtn>
        <Error showError={Object.entries(errors).length != 0}>
          {Object.values(errors)[0]?.message}
        </Error>
      </div>
      <button tabIndex={"-1"} onClick={togglefgtPwd}>
        <ArrowDownCircle />
      </button>
    </form>
  );
};

export default ForgotPass;
