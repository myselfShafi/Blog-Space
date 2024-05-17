import React, { useState } from "react";
import { Key } from "react-feather";
import { useForm } from "react-hook-form";
import { AuthWrapper, LoadBtn } from "../components";
import { Error, IconInput } from "../components/shared";
import { formValidate, textConfig } from "../config";

const ResetPass = () => {
  const [loading, setLoading] = useState(false);

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

  const onPwdChange = async () => {
    setLoading(true);
    try {
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  return (
    <AuthWrapper>
      <div className="bg-auth-2 text-center auth-div">
        <h2 className="hidden md:block">{textConfig.auth.createPwd}</h2>
        <p>
          <span className="font-bold">Note : </span> {textConfig.auth.note}
        </p>
      </div>
      <div className="bg-auth-1 auth-div">
        <form
          className="w-full auth-div p-0 grow"
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
      </div>
    </AuthWrapper>
  );
};

export default ResetPass;
