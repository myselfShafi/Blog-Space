import React from "react";
import { textConfig } from "../../config";
import { getTruncatedText } from "../../utilities";
import DateNRead from "./date&Read";

const CategoryCard = ({ data }) => {
  const text = "iPad Pro M1 Chip: Bringing The MacBook Pro Powersgdfh";
  const para =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolores iste dignissimos eveniet illum quaerat et delectus nostrum ipsum impedit, natus autem vel quibusdam harum amet vero animi dolorum voluptates?";
  const truncText = getTruncatedText(text, 48);
  const truncPara = getTruncatedText(para, 150);

  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <a href="/">
      <div className="bg-gray-100 dark:bg-gray-800 break-inside-avoid mb-10 lg:mb-16 group/category overflow-hidden hover:shadow-lg dark:hover:shadow-slate-950">
        <div className="relative group-hover/category:scale-105 transition-transform duration-300">
          <img
            src={
              typeof data === "string"
                ? data
                : "https://images.unsplash.com/photo-1653103674098-6ed995323607"
            }
            alt="category-card"
            className={`w-full object-cover object-center `}
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
          <DateNRead date={date} duration={"2 min read"} />
          <h6 className="font-thin group-hover/category:text-rose-500 group-hover/category:transition-colors group-hover/category:duration-300">
            {truncPara}
          </h6>
          <p className="text-center overline">
            {textConfig.by} <span className="font-bold">John Doe</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
