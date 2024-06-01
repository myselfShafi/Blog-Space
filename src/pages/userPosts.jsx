import { Query } from "appwrite";
import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle, Edit3 } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dbService, userService } from "../appWriteService";
import { LoaderPage, UserDetail } from "../components";
import ImageLoader from "../components/loaders/imgLoader";
import {
  EmptySection,
  Error,
  LazyImage,
  MainContainer,
  MiniCard,
} from "../components/shared";
import { textConfig } from "../config";
import NotFound from "./notFound";

const UserPosts = () => {
  const data = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [collection, setCollection] = useState([]);
  const [fetchErr, setFetchErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [imgStatus, setImgStatus] = useState({ loading: true, err: false });
  let dpRef = useRef(null);

  useEffect(() => {
    getPosts(data?.$id);
    getImg(data?.$id);
  }, [data]);

  const goToEdit = () => {
    if (!data?.emailVerification) {
      setErr(true);
    } else {
      navigate("/edit-post");
    }
  };

  const getPosts = async (userId) => {
    try {
      const resp = await dbService.getAllPosts([Query.equal("userID", userId)]);
      if (resp) {
        setCollection(resp);
      } else {
        setFetchErr(true);
      }
    } catch (error) {
      setFetchErr(true);
    }
    setLoading(false);
  };

  const getImg = async (userId) => {
    try {
      const resp = await userService.getUser(userId);
      if (resp) {
        const array = resp.documents[0];
        setUser(array);
        setImg(
          array?.displayImg
            ? userService.getFile(array?.displayImg)
            : "/static/placeholder.jpg"
        );
        setImgStatus({ loading: false, err: false });
      } else {
        setImgStatus({ loading: false, err: true });
      }
    } catch (error) {
      setImgStatus({ loading: false, err: true });
    }
  };

  const ondpChange = async (e) => {
    const file = e.target.files[0];
    setImgStatus({ loading: true, err: false });
    try {
      if (user?.displayImg) {
        await userService.deleteFile(user?.displayImg);
      }
      const resp = await userService.uploadprofile(file);
      if (resp) {
        await userService.updateUser(user?.$id, { displayImg: resp?.$id });
        setImg(URL.createObjectURL(file));
        setImgStatus({ loading: false, err: false });
      } else {
        setImgStatus({ loading: false, err: true });
      }
    } catch (error) {
      setImgStatus({ loading: false, err: true });
    }
  };

  return (
    <MainContainer>
      <div className="bg-shade p-10 lg:px-20 mb-20">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mb-2">
          <div className="relative mx-auto rounded-full w-fit group/div">
            <input
              type="file"
              className="hidden"
              ref={dpRef}
              accept="image/png, image/jpg, image/jpeg"
              onChange={ondpChange}
            />
            <LazyImage
              loaderClass={"w-36 h-36 lg:w-52 lg:h-52 rounded-full bg-loader"}
              src={img}
              alt="profile-image"
              className="w-36 h-36 lg:w-52 lg:h-52 object-cover rounded-full object-center "
            />
            <div
              onClick={() => {
                !imgStatus.loading && !imgStatus.err && dpRef.current.click();
              }}
              className={`absolute top-0 center-element rounded-full w-full h-full bg-slate-900/60 z-10  ${
                !imgStatus.loading &&
                !imgStatus.err &&
                "opacity-0 cursor-pointer"
              } group-hover/div:opacity-100 transition-opacity duration-300`}
            >
              {imgStatus.loading ? (
                <ImageLoader />
              ) : imgStatus.err ? (
                <AlertTriangle className="text-red-600" />
              ) : (
                <h5 className="px-2 footer-color rounded-xl">
                  {textConfig.user.upload}
                </h5>
              )}
            </div>
            <Edit3
              className="absolute top-0 right-0 lg:hidden"
              onClick={() => {
                !imgStatus.loading && !imgStatus.err && dpRef.current.click();
              }}
            />
          </div>
          <UserDetail
            data={data}
            setErr={setErr}
            totalPosts={collection?.total}
          />
          <div className="center-element">
            <button onClick={goToEdit} className="btn-contain">
              {textConfig.user.addPost}
            </button>
          </div>
        </div>
        <Error showError={err}>
          {textConfig.auth.verify}
          <span className="block lg:text-center">
            {textConfig.auth.verify2}
          </span>
        </Error>
      </div>
      {loading && <LoaderPage>{textConfig.loaders.userpost}</LoaderPage>}
      {!loading && fetchErr ? (
        <NotFound internalErr />
      ) : collection.total === 0 ? (
        <EmptySection isProfile />
      ) : (
        <div className="p-3 gap-10 lg:gap-16 lg:columns-2 xl:columns-3">
          {collection.documents?.map((collectionData) => (
            <MiniCard
              showStatus
              loaderHeight={"h-72"}
              key={collectionData.$id}
              data={collectionData}
              wrapperClass={"mx-auto"}
              imgClass={"max-h-96"}
              titleClass={"group-hover/mini:text-rose-500"}
            />
          ))}
          {/* <CardLoader /> */}
        </div>
      )}
    </MainContainer>
  );
};

export default UserPosts;
