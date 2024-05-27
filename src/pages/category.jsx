import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryService, dbService } from "../appWriteService";
import { LoaderPage } from "../components";
import { MainContainer } from "../components/shared";
import { textConfig } from "../config";
import NotFound from "./notFound";

const Category = () => {
  const [categories, setCategories] = useState(new Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const fetchCategory = await categoryService.getCategories([
          Query.greaterThan("count", 0),
        ]);
        if (fetchCategory) {
          setCategories(fetchCategory.documents);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    run();
  }, []);

  if (loading) {
    return <LoaderPage>{textConfig.loaders.category}</LoaderPage>;
  }

  if (error) {
    return <NotFound internalErr />;
  }

  return (
    <MainContainer>
      <h3 className="text-center font-extrabold">{textConfig.allcategory}</h3>
      <div className="my-10 lg:my-20 grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-10">
        {categories?.map((list, idx) => (
          <Link
            key={list?.$id ?? idx}
            to={`/all-category/${list?.categoryName}`}
            state={{ img: list?.defaultImage, title: list?.categoryName }}
          >
            <div
              className="relative mx-auto rounded-3xl center-element w-full lg:w-96 h-40 lg:h-96 bg-cover bg-center hover:shadow-2xl dark:hover:shadow-slate-950 before:absolute before:content-[''] before:bg-white/30 before:h-full before:w-full before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 overflow-hidden"
              style={{
                backgroundImage: `url(${
                  list?.defaultImage && dbService.getFile(list?.defaultImage)
                })`,
              }}
            >
              <h2 className="font-extrabold text-center text-white ">
                {list?.categoryName}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </MainContainer>
  );
};

export default Category;
