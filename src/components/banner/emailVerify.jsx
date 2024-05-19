import React, { useEffect, useState } from "react";
import { AnimationIcon } from "..";

const EmailVerify = () => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <div
      className={`w-full footer-color ${
        load ? "translate-y-1" : "-translate-y-full"
      } transition-transform duration-1000 text-nowrap center-element `}
    >
      <p className="hidden md:block font-bold text-sm">Almost there!</p>
      <span>
        <AnimationIcon
          src={"/public/static/email.json"}
          autoplay
          loop
          className={" h-10"}
        />
      </span>
      <p className="font-bold text-sm">
        Verify your email to activate your account.{" "}
        <span className="hidden md:inline-block">Check your Inbox.</span>
      </p>
    </div>
  );
};

export default EmailVerify;
