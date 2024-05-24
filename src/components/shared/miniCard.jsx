import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import dbService from "../../appWriteService/db.service";
import { getDate, getReadTime, getTruncatedText } from "../../utilities";
import MiniCardLoader from "../loaders/miniCardLoader";
import DateNRead from "./date&Read";

const MiniCard = ({ wrapperClass, hasBg, imgClass, titleClass, data }) => {
  const truncText = data?.title && getTruncatedText(data?.title, 48);
  const date = getDate(data?.$createdAt);
  const readtime = data?.content && getReadTime(parse(data?.content));

  if (!data) {
    return <MiniCardLoader hasBg={hasBg} />;
  }

  return (
    <Link to={`/all-category/${data.category}/${data.$id}`} reloadDocument>
      <div className={`group/mini overflow-hidden ${wrapperClass}`}>
        {data.thumbnail && (
          <img
            src={dbService.getFile(data.thumbnail)}
            alt={`post-image-${data.thumbnail}`}
            className={`w-full object-cover object-center group-hover/mini:scale-105 transition-transform duration-200 ${imgClass}`}
          />
        )}
        <div className={`p-8 transition-colors duration-200 space-y-2`}>
          {date && <DateNRead date={date} duration={readtime} />}
          <h5 className={`${titleClass}`}>{truncText}</h5>
        </div>
      </div>
    </Link>
  );
};

export default MiniCard;
