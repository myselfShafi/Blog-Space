import React from "react";
import { AnimationIcon } from "..";
import { textConfig } from "../../config";

const CustomErr = () => {
  return (
    <div className="relative grow center-element text-center flex-col gap-y-2">
      <AnimationIcon
        src={`/static/error.json`}
        speed={0.4}
        loop
        autoplay
        className={"w-36 h-36"}
      />
      <h6>{textConfig.errs.profile}</h6>
    </div>
  );
};

export default CustomErr;
