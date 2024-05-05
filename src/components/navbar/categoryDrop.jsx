import React from "react";
import { ChevronDown } from "react-feather";
import { textConfig } from "../../config";
import { Dropdown } from "../shared";

const categorylist = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1713502359486-d3611d924f61",
    title: "Nature",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
    title: "Film",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1688217161165-6ba7a54ec38e",
    title: "Travel",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1551225894-d26fc7d4e286",
    title: "Food & Drink",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1588596588734-3e1d408452ab",
    title: "Fashion",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1638193625184-fd7b6d313eb9",
    title: "Sports",
  },
];

export const CategoryDropdown = () => {
  return (
    <div>
      <Dropdown
        classes={"hidden lg:block"}
        title={textConfig.navMenu.category}
        icon={
          <ChevronDown className="size-4 group-hover/dropdown:rotate-180 transition-transform duration-300 transform" />
        }
      >
        <div className="grid grid-cols-4 gap-10 max-h-[70vh]">
          {categorylist.map((list) => (
            <section
              key={list.id}
              className="relative border dark:border-gray-900 w-fit h-fit hover:shadow-2xl group/category after:content-[''] after:absolute after:top-3 after:bottom-3 after:left-3 after:right-3 hover:after:border hover:after:dark:border-gray-900"
            >
              <img src={list.img} className="w-56 h-48 " />
              <h6 className="bg-white/75 dark:bg-gray-900/75 text-center px-2 py-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover/category:-translate-y-6 group-hover/category:scale-110 text-nowrap">
                {list.title}
              </h6>
            </section>
          ))}
        </div>
      </Dropdown>
      <a className="lg:hidden" href={"#"}>
        {textConfig.navMenu.category}
      </a>
    </div>
  );
};
