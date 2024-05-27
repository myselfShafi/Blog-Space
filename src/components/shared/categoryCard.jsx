import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "../../appWriteService";
import { textConfig } from "../../config";
import { getDate, getTruncatedText } from "../../utilities";
import useUsername from "../../utilities/hooks/useUsername";
import CategoryLoader from "../loaders/categoryLoader";
import DateNRead from "./date&Read";

const CategoryCard = ({ data, isloading }) => {
  const truncText = data?.title && getTruncatedText(data?.title, 48);
  const truncPara =
    data?.content &&
    getTruncatedText(parse(data?.content)[0]?.props.children, 150);
  const date = getDate(data?.$createdAt);
  const username = useUsername(data?.userID);

  if (isloading) {
    return <CategoryLoader />;
  }

  return (
    <Link to={`/all-category/${data?.category}/${data?.$id}`}>
      <div className="bg-shade break-inside-avoid mb-10 lg:mb-16 group/category overflow-hidden hover:shadow-lg dark:hover:shadow-slate-950">
        <div className="relative group-hover/category:scale-105 transition-transform duration-300">
          <img
            src={data?.thumbnail && dbService.getFile(data?.thumbnail)}
            alt="category-card"
            className={`w-full object-cover object-center `}
            loading="lazy"
          />
          <div className="absolute bg-gray-900/75 center-element lg:hidden lg:group-hover/category:center-element transition  h-20 lg:h-full bottom-0 left-0 right-0 ">
            <h6 className="text-white underline underline-offset-8 decoration-rose-500/50 hover:decoration-rose-500">
              {textConfig.read}
            </h6>
          </div>
        </div>
        <div
          className={`p-8 transition-colors duration-200 space-y-2 lg:space-y-4`}
        >
          <h5>{truncText}</h5>
          <DateNRead date={date} duration={2} />
          <h6 className="font-thin group-hover/category:text-rose-500 group-hover/category:transition-colors group-hover/category:duration-300 ">
            {truncPara}
          </h6>
          <p
            className={`text-center overline ${
              username ? "visible" : "invisible"
            }`}
          >
            {textConfig.by} <span className="font-bold">{username}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
