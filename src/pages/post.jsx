import { Query } from "appwrite";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Edit3, Share2, Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appWriteService/db.service";
import { AnimationIcon, LoadBtn, LoaderPage } from "../components";
import {
  DateNRead,
  Error,
  Heading,
  LazyImage,
  MainContainer,
  MiniCard,
} from "../components/shared";
import { textConfig } from "../config";
import { getDate, getRandomPosts, getReadTime } from "../utilities";
import useImgDimensions from "../utilities/hooks/useImgDimensions";
import NotFound from "./notFound";

const Post = () => {
  const { userData } = useSelector((state) => state.auth);
  const { category, post } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState({
    loading: false,
    error: false,
    done: false,
  });
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    category: "",
    title: "",
    content: "",
    thumbnail: "",
  });
  const [relPosts, setRelPosts] = useState(new Array(4).fill(null));

  const date = getDate(data?.$createdAt);
  const readtime = data?.content && getReadTime(parse(data?.content));

  const { height, width } = useImgDimensions(
    data.thumbnail && dbService.getFile(data.thumbnail)?.href
  );

  useEffect(() => {
    fetchData(post);
    relevantPosts(category);
  }, [post, category]);

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
    } finally {
    }
    setLoading(false);
  };

  const relevantPosts = async (value) => {
    try {
      const resp = await dbService.getAllPosts([
        Query.equal("category", value),
      ]);
      const docArray = resp.documents.filter((list) => list.$id !== post);
      if (docArray.length <= 4) {
        setRelPosts(docArray);
      } else if (docArray.length > 4) {
        const array = getRandomPosts(docArray, resp.total, 4);
        setRelPosts(array);
      }
    } catch (error) {
      return;
    }
  };

  const onDelete = async () => {
    setRemove({ loading: true, error: false });
    try {
      const resp = await dbService.deletePost(data.$id);
      if (resp) {
        setRemove({ loading: false, error: false, done: true });
        setTimeout(() => {
          navigate("/my-blogs", { replace: true });
        }, 5000);
      } else {
        setRemove({ loading: false, error: true });
      }
    } catch (error) {
      setRemove({ loading: false, error: true });
    }
  };

  if (loading) {
    return <LoaderPage>{textConfig.loaders.dataload}</LoaderPage>;
  }

  if (err) {
    return <NotFound internalErr hasBg />;
  }

  if (remove.done) {
    return (
      <div className="h-screen center-element flex-col gap-y-4">
        <AnimationIcon
          src={"/static/deleted.json"}
          autoplay
          loop
          speed={0.5}
          className={"w-56"}
        />
        <h3>{textConfig.user.deleteScs}</h3>
        <h5 className="tagline animate-pulse">{textConfig.user.redirect}</h5>
      </div>
    );
  }

  return (
    <MainContainer className={"p-0"}>
      <div className={"post-border lg:p-24 py-10"}>
        {data?.userID === userData?.$id && (
          <div className=" mb-10 flex justify-end gap-x-4 pr-10  text-white">
            <Error showError={remove.error}>{textConfig.user.deleteErr}</Error>
            <LoadBtn
              className={
                "flex justify-end btn-icon bg-red-600 group/btn opacity-75 hover:opacity-100"
              }
              isloading={remove.loading}
              onClick={onDelete}
            >
              <p className="slide-btn group-hover/btn:lg:w-full group-hover/btn:lg:mr-1">
                {textConfig.user.delete}
              </p>
              <Trash2 />
            </LoadBtn>
            <button
              className={
                "flex justify-end btn-icon bg-sky-600 group/btn opacity-75 hover:opacity-100"
              }
              onClick={() => navigate("/edit-post", { state: { docID: post } })}
            >
              <p className="slide-btn group-hover/btn:lg:w-full group-hover/btn:lg:ml-1 ">
                {textConfig.user.edit}
              </p>
              <Edit3 />
            </button>
          </div>
        )}
        <div className={`grid gap-y-6 ${height > width && "xl:grid-cols-2"} `}>
          {data.thumbnail ? (
            <LazyImage
              wrapperClass={`${width > height ? "center-element" : ""}`}
              loaderClass={
                "h-96 w-full lg:w-4/5 bg-loader animate-pulse mx-auto"
              }
              src={data?.thumbnail && dbService.getFile(data.thumbnail)}
              alt="img-post"
              className={`${
                height > width ? "w-full" : "lg:w-4/5"
              } max-h-screen object-contain object-center`}
            />
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
              hasBg={true}
              imgClass={"h-72"}
              wrapperClass={"post-border border-0 lg:border h-full"}
              titleClass={"group-hover/mini:text-purple-600"}
            />
          ))}
        </div>
      </>
    </MainContainer>
  );
};

export default Post;
