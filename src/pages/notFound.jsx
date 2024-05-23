import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnimationIcon } from "../components";

const NotFound = ({ routeErr, internalErr, hasBg }) => {
  const { lightMode } = useSelector((state) => state.settings);
  return (
    <div
      className={`h-screen ${
        hasBg && "bg-gradient-light dark:bg-gradient-dark"
      } center-element flex-col lg:flex-row text-center gap-x-10`}
    >
      <AnimationIcon
        src={`/static/error404-${lightMode ? "light" : "dark"}.json`}
        autoplay
        loop
        className={"w-[80%] lg:w-[30vw]"}
      />
      {routeErr && (
        <div className="p-4 lg:p-0 font-comic-neue text-shade">
          <h1 className="mb-4 italic">
            404: Kaboom!{" "}
            <span className="text-rose-700 dark:text-red-600">Wrong route</span>
            ?
          </h1>
          <h3 className="font-extrabold tracking-widest">A typo, perhaps?</h3>
          <h5 className="font-medium tracking-widest mb-4">
            No worries, let's take you back home.
          </h5>
          <Link
            to={"/"}
            replace
            className="text-xl underline underline-offset-8"
          >
            Go Back
          </Link>
        </div>
      )}
      {internalErr && (
        <div className="p-4 lg:p-0 font-comic-neue text-shade">
          <h1 className="mb-4 italic">UH-OH! Something broke ...</h1>
          <h4 className="font-medium">This is not on your end,</h4>
          <h4 className="font-medium mb-4">
            I'm probably working on something that has blown up.
          </h4>
          <h5 className={"leading-10"}>
            In meantime, why not explore other{" "}
            <Link
              to={"/all-category"}
              className={
                "underline underline-offset-8 dark:text-rose-400 text-sky-600"
              }
            >
              categories
            </Link>{" "}
            ?
          </h5>
        </div>
      )}
    </div>
  );
};

export default NotFound;
