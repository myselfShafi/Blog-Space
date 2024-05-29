import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import dbService from "../../appWriteService/db.service";
import {
  getCapitalize,
  getDate,
  getReadTime,
  getTruncatedText,
} from "../../utilities";
import MiniCardLoader from "../loaders/miniCardLoader";
import DateNRead from "./date&Read";
import LazyImage from "./lazyImage";

const MiniCard = ({
  wrapperClass,
  hasBg,
  imgClass,
  titleClass,
  data,
  showImage = false,
  loaderHeight,
  showStatus,
}) => {
  const truncText = data?.title && getTruncatedText(data?.title, 48);
  const date = getDate(data?.$createdAt);
  const readtime = data?.content && getReadTime(parse(data?.content));

  if (!data) {
    return <MiniCardLoader hasBg={hasBg} />;
  }

  return (
    <Link to={`/all-category/${data.category}/${data.$id}`} reloadDocument>
      <div className={`group/mini overflow-hidden ${wrapperClass}`}>
        {(showImage || data.thumbnail) && (
          <LazyImage
            loaderClass={`${imgClass} bg-loader`}
            loaderHeight={loaderHeight}
            src={
              data?.thumbnail
                ? dbService.getFile(data.thumbnail)
                : "/static/logo.png"
            }
            alt={`post-image-${data.thumbnail}`}
            className={`w-full object-cover object-center group-hover/mini:scale-105 transition-transform duration-200 ${imgClass}`}
          />
        )}
        <div className={`p-8 transition-colors duration-200 space-y-2`}>
          {showStatus && (
            <div className="font-bold post-border w-fit px-1.5 center-element gap-x-1">
              <div
                className={`w-2 h-2 ${
                  data?.status === "private" ? "bg-orange-500" : "bg-green-600"
                } rounded-full`}
              ></div>
              <p>{getCapitalize(data?.status)}</p>
            </div>
          )}
          {date && <DateNRead date={date} duration={readtime} />}
          <h5 className={`${titleClass}`}>{truncText}</h5>
        </div>
      </div>
    </Link>
  );
};

export default MiniCard;
