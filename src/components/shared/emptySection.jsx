import React from "react";
import { Link } from "react-router-dom";
import { AnimationIcon } from "..";

const EmptySection = ({ isProfile }) => {
  return (
    <div className="h-screen center-element gap-y-2 flex-col text-center">
      <AnimationIcon
        src={"/static/nothing.json"}
        autoplay
        loop
        className={"h-96"}
      />
      {isProfile && (
        <h4 className="leading-10">
          Nothing here yet. Start your first{" "}
          <Link
            to={"/edit-post"}
            className="font-bold text-rose-600 hover:underline underline-offset-4"
          >
            BLOG
          </Link>{" "}
          !
        </h4>
      )}
    </div>
  );
};

export default EmptySection;
