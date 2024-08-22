import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { categoryService, dbService } from "../appWriteService";
import {
  CategoryCard,
  EmptySection,
  LazyBg,
  MainContainer,
} from "../components/shared";

const CategoryPosts = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const { category } = useParams();
  const [banner, setBanner] = useState(null);
  const [posts, setPosts] = useState(new Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetchCategory();
    fetchPosts();
  }, [category]);

  const fetchCategory = async () => {
    try {
      const categoryData = await categoryService.getCategories([
        Query.equal("categoryName", category),
      ]);
      if (categoryData.total > 0) {
        setBanner(categoryData.documents[0]);
      }
    } catch (error) {}
  };

  const fetchPosts = async () => {
    setLoading(true);
    setErr(false);
    try {
      const allposts = await dbService.getAllPosts([
        Query.equal("category", category),
        Query.equal("status", "public"),
      ]);
      if (allposts) {
        setPosts(allposts.documents?.reverse());
        setLoading(false);
      }
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div
      className={`${
        !userData?.emailVerification && status
          ? "mt-32 mb-20 lg:mt-52 lg:mb-40"
          : "my-20 lg:my-40"
      }`}
    >
      <LazyBg
        wrapperClass={"w-full h-96 lg:h-[50vh]"}
        className="w-full h-96 lg:h-[50vh] bg-cover bg-center center-element"
        thumbnail={banner?.defaultImage ?? "/static/banner.jpg"}
      >
        <h2 className="mix-blend-screen center-element bg-white/75 dark:bg-gray-900/75 min-w-56 min-h-56 px-3  rounded-full font-extrabold text-center">
          {banner?.categoryName}
        </h2>
      </LazyBg>
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
