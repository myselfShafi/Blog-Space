import { Query } from "appwrite";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Share2 } from "react-feather";
import { useParams } from "react-router-dom";
import dbService from "../appWriteService/db.service";
import { LoaderPage } from "../components";
import {
  DateNRead,
  Heading,
  MainContainer,
  MiniCard,
} from "../components/shared";
import { textConfig } from "../config";
import { getDate, getRandomPosts, getReadTime } from "../utilities";
import useImgDimensions from "../utilities/hooks/useImgDimensions";
import NotFound from "./notFound";

const Post = () => {
  const { category, post } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    category: "",
    title: "",
    content: "",
    thumbnail: "",
  });
  const [relPosts, setRelPosts] = useState([]);
  const id = post ?? "664ed0ce002868ebc8f6";

  const date = getDate(data?.$createdAt);
  const readtime = getReadTime(parse(data?.content));

  const { height, width } = useImgDimensions(
    dbService.getFile(data.thumbnail)?.href
  );

  useEffect(() => {
    fetchData(id);
    relevantPosts(category);
  }, [id, category]);

  const fetchData = async (postID) => {
    try {
      const postdata = await dbService.getPost(postID);
      if (postdata) {
        setData(postdata);
      } else {
        setErr(true);
      }
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
  };

  const relevantPosts = async (value) => {
    try {
      const resp = await dbService.getAllPosts([
        Query.equal("category", value),
      ]);
      console.log({ resp });
      if (resp.total <= 4) {
        setRelPosts(resp.documents);
      } else if (resp.total > 4) {
        const array = getRandomPosts(resp.documents, resp.total, 4);
        console.log({ array });
        setRelPosts(array);
      }
    } catch (error) {
      return;
    }
  };

  if (loading) {
    return <LoaderPage>{textConfig.loaders.dataload}</LoaderPage>;
  }

  if (err) {
    return <NotFound internalErr hasBg />;
  }

  return (
    <MainContainer className={"p-0"}>
      <div className={"post-border lg:p-24"}>
        <div
          className={`grid gap-y-6 ${
            height > width && "xl:grid-cols-2"
          } py-10 lg:py-0`}
        >
          {data.thumbnail ? (
            <div className={width > height ? "center-element" : ""}>
              <img
                src={dbService.getFile(data.thumbnail)}
                alt="img-post"
                className={`${
                  height > width ? "w-full" : "w-3/4"
                } max-h-screen object-contain object-center`}
              />
            </div>
          ) : null}
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
      {relPosts && (
        <>
          <Heading className={"relative"}>
            {textConfig.related}
            <span className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 text-base font-extralight post-border px-2 py-1">
              <a href={`/all-category/${data?.category}`}>{textConfig.view}</a>
            </span>
          </Heading>
          <div className="card-grid">
            {relPosts?.map((item, idx) => (
              <MiniCard
                key={idx}
                data={item}
                imgClass={"h-72"}
                wrapperClass={"post-border border-0 lg:border h-full"}
                titleClass={"group-hover/mini:text-purple-600"}
              />
            ))}
          </div>
        </>
      )}
    </MainContainer>
  );
};

export default Post;
