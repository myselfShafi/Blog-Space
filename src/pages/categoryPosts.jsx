import React from "react";
import { Loader } from "react-feather";
import { useLocation, useParams } from "react-router-dom";
import { CategoryCard, MainContainer } from "../components/shared";

const CategoryPosts = () => {
  const params = useParams();
  const { state } = useLocation();

  return (
    <div className="my-20 lg:my-40">
      <div
        className="w-full h-96 lg:h-[50vh] bg-cover bg-center center-element"
        style={{ backgroundImage: `url(${state.img})` }}
      >
        <h2 className="mix-blend-screen center-element bg-white/75 dark:bg-gray-900/75 min-w-56 min-h-56 px-3  rounded-full font-extrabold text-center">
          {params.category}
        </h2>
      </div>
      <MainContainer className={"p-0"}>
        <div className="p-3 gap-10 lg:gap-16 lg:columns-2 xl:columns-3">
          {[
            "https://images.unsplash.com/photo-1714409299166-de863d9598fb",
            "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0",
            "https://images.unsplash.com/photo-1715090156594-aaa3ed5900b9",
            2,
            "https://images.unsplash.com/photo-1505144808419-1957a94ca61e",
            "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
            3,
          ].map((item, idx) => (
            <CategoryCard key={idx} data={item} />
          ))}
          <div className="center-element w-full h-52 animate-pulse bg-gray-50 mt-10 lg:mt-16">
            <Loader className="animate-spin size-10" />
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default CategoryPosts;
