import React, { useEffect, useState } from "react";
import { ArrowDownCircle, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import { AnimationIcon } from "..";
import authService from "../../appWriteService/auth.service";
import { envConfig, formValidate, textConfig } from "../../config";
import LoadBtn from "../loaders/loaderButton";
import { Error, IconInput } from "../shared";

const ForgotPass = ({ sidePanel, togglefgtPwd }) => {
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [sendEmail, setSendEmail] = useState("");
  const [resent, setResent] = useState(false);
  const [count, setCount] = useState(30);

  const {
    handleSubmit,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  useEffect(() => {
    let countdown;
    if (sendEmail && count > 0) {
      countdown = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [sendEmail, count]);

  const passEmail = async ({ email }) => {
    setLoading(true);
    try {
      const resp = await authService.resetEmail({
        email,
        resetURL: envConfig.resetURL,
      });
      if (resp.userId) {
        setSendEmail(email);
        setCount(30);
      } else {
        setError("root", { type: "manual", message: resp });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (sendEmail) {
      setResent(true);
      return await passEmail({ email: sendEmail });
    }
  };

  return (
    <div
      className={`absolute w-full h-fit lg:h-full bottom-0 left-0 text-center auth-div bg-sky-700 dark:bg-fuchsia-950 transition-transform duration-200 ${
        sidePanel ? "-translate-y-1" : "translate-y-full"
      }`}
    >
      <form
        noValidate
        autoComplete="off"
        className="grow w-full auth-div p-0"
        onSubmit={handleSubmit(passEmail)}
      >
        <h2>{textConfig.auth.fgtpwd2}</h2>
        <IconInput
          type="email"
          placeholder={"email address"}
          icon={<Mail />}
          tabIndex={"-1"}
          hasError={errors.email}
          onFocus={() => setHide(false)}
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
      </form>
      <button tabIndex={"-1"} onClick={togglefgtPwd}>
        <ArrowDownCircle />
      </button>

      <div
        className={`absolute top-0 bg-blue-100/20 backdrop-blur-xl rounded-b-3xl auth-div gap-0 p-6 pt-0 lg:pt-0  ${
          sendEmail ? "translate-y-1" : " -translate-y-full"
        } ${hide && "hidden"} transition-transform duration-150`}
      >
        <AnimationIcon
          src={"/src/assets/mailsent.json"}
          autoplay
          loop
          className={"w-32 h-32"}
        />
        <h4>{textConfig.auth.inbox}</h4>
        <p className="my-3">
          Password reset email {resent ? "resent" : "sent"} to
          <span className="font-bold block text-rose-800 dark:text-indigo-800">
            {sendEmail || "your entered email"}
          </span>
        </p>
        <span className={`text-sm ${count > 0 && "invisible"}`}>
          {textConfig.auth.check}
        </span>
        <LoadBtn
          isloading={loading}
          type={"button"}
          tabIndex={"-1"}
          className={`btn-auth w-fit mt-3`}
          disabled={count > 0}
          onClick={handleResend}
        >
          {count > 0 ? count : textConfig.auth.resend}
        </LoadBtn>
      </div>
    </div>
  );
};

export default ForgotPass;
