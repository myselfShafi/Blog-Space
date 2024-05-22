import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Share2 } from "react-feather";
import dbService from "../appWriteService/db.service";
import { LoaderPage } from "../components";
import {
  DateNRead,
  Heading,
  MainContainer,
  MiniCard,
} from "../components/shared";
import { textConfig } from "../config";
import { getDate, getReadTime } from "../utilities";
import useImgDimensions from "../utilities/hooks/useImgDimensions";

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    category: "",
    title: "",
    content: "",
    thumbnail: "",
  });
  const [img, setImg] = useState({});
  const id = "664b7e48003d0489bb02";

  const date = getDate(data?.$createdAt);
  const readtime = getReadTime(parse(data?.content));

  const { height, width } = useImgDimensions(img?.href);

  useEffect(() => {
    fetchData(id);
    if (img) {
    }
  }, [id]);

  const fetchData = async (postID) => {
    try {
      const postdata = await dbService.getPost(postID);
      if (postdata) {
        setData(postdata);
        const image = await dbService.getFile(postdata.thumbnail);
        setImg(image);
      } else {
        console.log("error");
        //redirect 404 page
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoaderPage>Loading Blog Information ...</LoaderPage>;
  }

  return (
    <MainContainer className={"p-0"}>
      <div className={"post-border lg:p-24"}>
        <div className={`grid gap-y-6 ${height > width && "xl:grid-cols-2"}`}>
          <div className={width > height && "center-element"}>
            <img
              src={data.thumbnail && img}
              alt="img-post"
              className={`${
                height > width ? "w-full" : "w-3/4"
              } max-h-screen object-contain object-center`}
            />
          </div>
          <div className="px-3 py-5 lg:py-0 lg:px-14 space-y-6 overflow-y-auto lg:max-h-screen scrollbar">
            <DateNRead date={date} duration={readtime} durationClass={"grow"}>
              <Share2 />
            </DateNRead>
            <h6 className="w-fit px-2 uppercase tracking-widest text-purple-600 border border-purple-600 font-bold">
              {data.category}
            </h6>
            <h4 className="text-stone-700 dark:text-stone-300">{data.title}</h4>
            <h6 className="font-thin">{parse(data.content)}</h6>
          </div>
        </div>
      </div>
      <Heading className={"relative"}>
        {textConfig.related}
        <span className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 text-base font-extralight post-border px-2 py-1">
          <a href="/">{textConfig.view}</a>
        </span>
      </Heading>
      <div className="card-grid">
        {[1, 2, 3, 4].map((item, idx) => (
          <MiniCard
            key={idx}
            imgClass={"h-72"}
            wrapperClass={"post-border border-0 lg:border"}
            titleClass={"group-hover/mini:text-purple-600"}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default Post;
