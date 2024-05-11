import React from "react";
import { Link } from "react-router-dom";
import { categorylist } from "../components/navbar/categoryDrop";
import { MainContainer } from "../components/shared";
import { textConfig } from "../config";

const Category = () => {
  return (
    <MainContainer>
      <h3 className="text-center font-extrabold">{textConfig.allcategory}</h3>
      <div className="my-10 lg:my-20 grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-10">
        {categorylist.map((list) => (
          <Link
            key={list.id}
            to={list.href}
            state={{ img: list.img, title: list.title }}
          >
            <div
              className="relative mx-auto rounded-3xl center-element w-full lg:w-96 h-40 lg:h-96 bg-cover bg-center hover:shadow-2xl dark:hover:shadow-slate-950 before:absolute before:content-[''] before:bg-white/30 before:h-full before:w-full before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 overflow-hidden"
              style={{ backgroundImage: `url(${list?.img})` }}
            >
              <h2 className="font-extrabold text-center text-white ">
                {list?.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </MainContainer>
  );
};

export default Category;
