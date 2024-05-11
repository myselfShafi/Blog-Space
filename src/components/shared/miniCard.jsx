import React from "react";
import { Link } from "react-router-dom";
import { getTruncatedText } from "../../utilities";
import DateNRead from "./date&Read";

const MiniCard = ({ wrapperClass, imgClass, titleClass, data }) => {
  const text = "iPad Pro M1 Chip: Bringing The MacBook Pro Powersgdfh";
  const truncText = getTruncatedText(text, 48);

  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const postId = "asfgsdfjghkshfghgfj";

  return (
    <Link to={`/all-category/sports/blog-${postId}`} reloadDocument>
      <div className={`group/mini overflow-hidden ${wrapperClass} `}>
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
          {date && <DateNRead date={date} duration={"2 min read"} />}
          <h5 className={`${titleClass}`}>{truncText}</h5>
        </div>
      </div>
    </Link>
  );
};

export default MiniCard;
