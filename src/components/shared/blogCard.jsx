import React from "react";
import { Calendar, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { textConfig } from "../../config";
import { getDate, getTruncatedText } from "../../utilities";
import BlogCardLoader from "../loaders/blogCardLoader";

const BlogCard = ({ data }) => {
  const navigate = useNavigate();

  const string =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque minus deleniti asperiores modi hic sed ut, recusandae labore eius unde omnis aliquid harum sint, temporibus dolorum ab blanditiis. Voluptates, explicabo.";
  const trucTitle = data?.title && getTruncatedText(data?.title, 100);

  const TruncText = "";
  // data?.content && getTruncatedText(parse(data?.content), 160);
  const date = getDate(data.$createdAt);
  if (!data) {
    return <BlogCardLoader />;
  }

  return (
    <section className="lg:flex container p-5 lg:w-11/12 2xl:w-full hover:drop-shadow-lg hover:shadow-lg dark:hover:drop-shadow-gray-800 dark:hover:shadow-slate-950 group/card">
      <div className="flex-none w-full h-80 lg:w-120 lg:h-96 2xl:h-[22rem] relative">
        <img
          src="https://images.unsplash.com/photo-1714572877777-59bf4765f462"
          alt="card-img"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="py-3 px-6 space-y-4">
        <h6 className="uppercase tracking-widest text-purple-600 font-bold">
          {data?.category}
        </h6>
        <h5 className="text-stone-700 dark:text-stone-300">{trucTitle}</h5>
        <p className="leading-7 text-lg group-hover/card:text-rose-500 transition-colors delay-75">
          {TruncText}
        </p>
        <button
          onClick={() => navigate("/all-category/nature/blog-asfg")}
          className="py-1 px-2 border border-red-600 text-red-600  lg:invisible group-hover/card:visible btn-outline"
        >
          {textConfig.shared.more}
        </button>
        <div className="flex gap-x-6">
          <div className="flex items-center gap-x-2">
            <User />
            <p>{data?.username}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Calendar />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
