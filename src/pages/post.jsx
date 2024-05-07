import React from "react";
import { Share2 } from "react-feather";
import { Heading, MainContainer, MiniCard } from "../components/shared";
import { textConfig } from "../config";

const Post = () => {
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <MainContainer className={"p-0"}>
      <div className={"post-border lg:p-24"}>
        <div className="grid xl:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1585770536735-27993a080586"
              alt="img-post"
              className="w-full max-h-screen object-cover object-center"
            />
          </div>
          <div className="px-3 py-5 lg:py-0 lg:px-14 space-y-6 overflow-y-auto lg:max-h-screen scrollbar">
            <div className="flex gap-2 items-center text-gray-500">
              <h6>{date}</h6>
              <div className="w-1 h-1 rounded-full bg-gray-500 mx-1"></div>
              <h6 className="grow">2 min read</h6>
              <Share2 />
            </div>
            <h6 className="w-fit px-2 uppercase tracking-widest text-purple-600 border border-purple-600 font-bold">
              Nature
            </h6>
            <h4 className="text-stone-700 dark:text-stone-300">
              iPad Pro M1 Chip: Bringing The MacBook Pro Power
            </h4>
            {[1, 2, 3, 4].map((each, idx) => (
              <h6 className="font-thin" key={idx}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, ipsam itaque sapiente harum temporibus, impedit
                blanditiis maxime cum iure fuga suscipit. Ratione soluta
                voluptas nam quidem. Velit quia iure quaerat? Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Ipsa, perspiciatis
                dolorem et odio praesentium quaerat tenetur maxime iusto aperiam
                exercitationem! Eligendi blanditiis dolorem sunt quasi ipsa
                laudantium obcaecati repellendus saepe.
              </h6>
            ))}
          </div>
        </div>
      </div>
      <Heading className={"relative"}>
        {textConfig.related}
        <span className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 text-base font-extralight post-border px-2 py-1">
          <a href="">View All</a>
        </span>
      </Heading>
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
      </div>
    </MainContainer>
  );
};

export default Post;
