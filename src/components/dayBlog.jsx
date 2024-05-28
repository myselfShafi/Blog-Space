import React from "react";
import { Link } from "react-router-dom";
import dbService from "../appWriteService/db.service";
import { textConfig } from "../config";
import { getDate } from "../utilities";
import useUsername from "../utilities/hooks/useUsername";
import { Heading } from "./shared";
import LazyBg from "./shared/lazybg";

const DayBlog = ({ data }) => {
  const date = getDate(data?.$createdAt);
  const username = useUsername(data?.userID);

  return (
    <div className="p-0 overflow-hidden">
      <Heading>{textConfig.dashboard.dayBlog}</Heading>
      {data ? (
        <Link to={`/all-category/${data?.category}/${data?.$id}`}>
          <div className="relative my-10 h-[40rem] overflow-hidden group/wrapper">
            <LazyBg
              className="h-full bg-cover bg-center group-hover/wrapper:scale-105 transition-transform duration-200 shadow-inner-3xl"
              imgURL={data?.thumbnail && dbService.getFile(data?.thumbnail)}
              wrapperClass={"h-[40rem] w-full"}
            />
            <div className="absolute top-0 left-0 h-full w-full lg:opacity-50 group-hover/wrapper:opacity-100 group-hover/wrapper:backdrop-blur-sm p-10 lg:p-16 flex flex-col justify-end transition delay-100">
              <div className="text-white space-y-4">
                <h6 className="px-2 bg-red-700 w-fit uppercase font-extrabold">
                  {data?.category}
                </h6>
                <h2 className="max-w-[85%]">{data?.title}</h2>
                <h6 className="font-extralight">
                  {username && (
                    <>
                      {textConfig.by}{" "}
                      <span className={`font-bold`}>{username}</span> -{" "}
                    </>
                  )}
                  {date}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative my-10 h-[40rem] bg-loader animate-pulse">
          <div className="absolute bottom-0 left-0 h-full w-full p-10 lg:p-16 flex flex-col justify-end space-y-4">
            <h6 className="w-24 h-9 rounded-lg bg-shade"></h6>
            <h2 className="max-w-[50%] h-8 rounded-xl bg-shade"></h2>
            <h6 className="h-8 w-60 rounded-xl bg-shade"></h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayBlog;
