import React from "react";
import { MainContainer } from "../components/shared";

const CategoryPosts = () => {
  const img = "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d";

  return (
    <MainContainer className={"p-0"}>
      <div
        className="w-full h-96 lg:h-[50vh] bg-cover bg-center center-element"
        style={{ backgroundImage: `url(${img})` }}
      >
        <h2 className="mix-blend-screen center-element bg-white/75 dark:bg-gray-900/75 w-56 h-56  rounded-full font-extrabold">
          Nature
        </h2>
      </div>
    </MainContainer>
  );
};

export default CategoryPosts;
