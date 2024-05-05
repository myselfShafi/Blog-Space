import React from "react";
import { Calendar, User } from "react-feather";

const BlogCard = () => {
  const string =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque minus deleniti asperiores modi hic sed ut, recusandae labore eius unde omnis aliquid harum sint, temporibus dolorum ab blanditiis. Voluptates, explicabo.";
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      onClick={() => alert("clicked")}
      className="lg:flex container p-4 lg:w-11/12 xl:w-3/4 hover:drop-shadow-lg hover:shadow-lg dark:hover:drop-shadow-gray-800 dark:hover:shadow-slate-950 cursor-pointer"
    >
      <div className="flex-none w-full h-80 lg:w-120 lg:h-80 relative">
        <img
          src="https://images.unsplash.com/photo-1714572877777-59bf4765f462"
          alt="card-img"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="py-3 px-6 space-y-4">
        <h6 className="uppercase tracking-widest text-purple-600 font-bold">
          Nature
        </h6>
        <h5>iPad Pro M1 Chip: Bringing The MacBook Pro Power</h5>
        <p className="leading-7 text-lg">
          {string.length > 160
            ? string.substring(0, 160).concat(" ...")
            : string}
        </p>
        <div className="flex gap-x-6">
          <div className="flex items-center gap-x-2">
            <User />
            <p>John Doe</p>
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
