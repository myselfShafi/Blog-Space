import React from "react";
import { getTruncatedText } from "../../utilities";

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
      <div className="bg-gray-100 dark:bg-gray-800 break-inside-avoid mb-10 lg:mb-16">
        <img
          src={
            typeof data === "string"
              ? data
              : "https://images.unsplash.com/photo-1653103674098-6ed995323607"
          }
          alt="category-card"
          className={`w-full object-cover object-center `}
        />
        <div className={`p-8 transition-colors duration-200 space-y-2`}>
          <h5>{truncText}</h5>
          <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
            <p>{date}</p>
            <div className="w-1 h-1 rounded-full bg-gray-500 mx-1"></div>
            <p>2 min read</p>
          </div>
          <h6 className="font-thin">{truncPara}</h6>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
