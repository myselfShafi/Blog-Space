import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dbService } from "../appWriteService";
import {
  CategoryCard,
  EmptySection,
  MainContainer,
} from "../components/shared";

const CategoryPosts = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const { state, pathname } = useLocation();
  const [posts, setPosts] = useState(new Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setErr(false);
      try {
        const allposts = await dbService.getAllPosts([
          Query.equal("category", state?.title),
        ]);
        if (allposts) {
          setPosts(allposts.documents?.reverse());
          setLoading(false);
        }
      } catch (error) {
        setErr(true);
      }
    };
    fetch();
  }, [pathname]);

  return (
    <div
      className={`${
        !userData?.emailVerification && status
          ? "mt-32 mb-20 lg:mt-52 lg:mb-40"
          : "my-20 lg:my-40"
      }`}
    >
      <div
        className="w-full h-96 lg:h-[50vh] bg-cover bg-center center-element"
        style={{
          backgroundImage: `url(${
            state?.img && dbService.getFile(state?.img)
          })`,
        }}
      >
        <h2 className="mix-blend-screen center-element bg-white/75 dark:bg-gray-900/75 min-w-56 min-h-56 px-3  rounded-full font-extrabold text-center">
          {state?.title}
        </h2>
      </div>
      <MainContainer className={"lg:mt-40 p-0"}>
        {err ? (
          <EmptySection isProfile />
        ) : (
          <div className="p-3 gap-10 lg:gap-16 lg:columns-2 xl:columns-3">
            {posts?.map((item, idx) => (
              <CategoryCard
                key={item?.$id ?? idx}
                data={item}
                isloading={loading}
              />
            ))}
            {/* <CardLoader /> */}
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default CategoryPosts;
