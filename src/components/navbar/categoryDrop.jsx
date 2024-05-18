import React from "react";
import { ChevronDown } from "react-feather";
import { Link } from "react-router-dom";
import { textConfig } from "../../config";
import { Dropdown } from "../shared";

export const categorylist = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1713502359486-d3611d924f61",
    title: "Nature",
    href: "/all-category/nature",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
    title: "Film",
    href: "/all-category/film",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1688217161165-6ba7a54ec38e",
    title: "Travel",
    href: "/all-category/travel",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1551225894-d26fc7d4e286",
    title: "Food & Drink",
    href: "/all-category/food-&-drink",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1588596588734-3e1d408452ab",
    title: "Fashion",
    href: "/all-category/fashion",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1638193625184-fd7b6d313eb9",
    title: "Sports",
    href: "/all-category/sports",
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
        hover={true}
        optionClass={"w-max -right-full h-fit"}
      >
        <div className=" p-10 grid grid-cols-4 gap-10 ">
          {categorylist.map((list) => (
            <Link
              to={list.href}
              state={{ img: list.img, title: list.title }}
              key={list.id}
            >
              <section className="relative border dark:border-gray-900 w-fit h-fit hover:shadow-2xl group/category after:content-[''] after:absolute after:top-3 after:bottom-3 after:left-3 after:right-3 hover:after:border hover:after:dark:border-gray-900">
                <img src={list.img} className="w-56 h-48 " />
                <h6 className="bg-white/75 dark:bg-gray-900/75 text-center px-2 py-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover/category:-translate-y-6 group-hover/category:scale-110 text-nowrap">
                  {list.title}
                </h6>
              </section>
            </Link>
          ))}
        </div>
      </Dropdown>
      <Link
        className="lg:hidden"
        to={"/all-category"}
        state={{ list: categorylist }}
      >
        {textConfig.navMenu.category}
      </Link>
    </div>
  );
};
