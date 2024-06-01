import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import { Link } from "react-router-dom";
import { categoryService, dbService } from "../../appWriteService";
import { textConfig } from "../../config";
import { CustomErr, Dropdown, LazyImage } from "../shared";

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState(new Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      try {
        const fetchCategory = await categoryService.getCategories([
          Query.greaterThan("count", 0),
        ]);
        if (isMounted && fetchCategory) {
          setCategories((prevCategory) => {
            if (
              JSON.stringify(prevCategory) !==
              JSON.stringify(fetchCategory.documents)
            ) {
              return fetchCategory.documents;
            }
            return prevCategory;
          });
        } else {
          if (isMounted) setError(true);
        }
      } catch (error) {
        if (isMounted) setError(true);
      } finally {
        if (!isMounted) setError(false);
        setLoading(false);
      }
    };
    fetch();
    const fetchInterval = setInterval(() => {
      fetch();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(fetchInterval);
    };
  }, []);

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
        {error ? (
          <div className="p-10">
            <CustomErr />
          </div>
        ) : (
          <div className=" p-10 grid grid-cols-4 gap-10 ">
            {categories?.map((list, idx) => {
              return loading ? (
                <div
                  key={idx}
                  className="w-56 h-48 bg-shade animate-pulse"
                ></div>
              ) : (
                <Link
                  key={list?.$id ?? idx}
                  to={`/all-category/${list?.categoryName}`}
                  state={{ img: list?.defaultImage, title: list?.categoryName }}
                >
                  <section className="relative border dark:border-gray-900 w-fit h-fit hover:shadow-2xl group/category after:content-[''] after:absolute after:top-3 after:bottom-3 after:left-3 after:right-3 hover:after:border hover:after:dark:border-gray-900">
                    <LazyImage
                      loaderClass={"w-56 h-48 bg-loader"}
                      src={`${
                        list?.defaultImage
                          ? dbService.getFile(list?.defaultImage)
                          : "/static/logo.png"
                      }`}
                      className="w-56 h-48 object-cover object-center"
                      loading={"eager"}
                    />
                    <h6 className="bg-white/75 dark:bg-gray-900/75 text-center px-2 py-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover/category:-translate-y-6 group-hover/category:scale-110">
                      {list?.categoryName}
                    </h6>
                  </section>
                </Link>
              );
            })}
          </div>
        )}
      </Dropdown>
      <Link className="lg:hidden" to={"/all-category"}>
        {textConfig.navMenu.category}
      </Link>
    </div>
  );
};
