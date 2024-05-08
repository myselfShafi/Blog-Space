import React from "react";
import { getTruncatedText } from "../../utilities";

const MiniCard = ({ wrapperClass, imgClass, titleClass, data }) => {
  const text = "iPad Pro M1 Chip: Bringing The MacBook Pro Powersgdfh";
  const truncText = getTruncatedText(text, 48);

  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <a href="/">
      <div
        className={`xl:max-w-[20vw] group/mini overflow-hidden ${wrapperClass} `}
      >
        <img
          src={
            typeof data === "string"
              ? data
              : "https://images.unsplash.com/photo-1653103674098-6ed995323607"
          }
          alt="mini-card"
          className={`w-full object-cover object-center group-hover/mini:scale-105 transition-transform duration-200 ${imgClass}`}
        />
        <div className={`p-8 transition-colors duration-200 space-y-2`}>
          {date && (
            <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
              <p>{date}</p>
              <div className="w-1 h-1 rounded-full bg-gray-500 mx-1"></div>
              <p>2 min read</p>
            </div>
          )}
          <h5 className={`${titleClass}`}>{truncText}</h5>
        </div>
      </div>
    </a>
  );
};

export default MiniCard;
