import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dbService } from "../appWriteService";
import { CardLoader, LoaderPage, UserDetail } from "../components";
import {
  EmptySection,
  Error,
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
  const img = data?.img;

  useEffect(() => {
    getPosts(data?.$id);
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

  return (
    <MainContainer>
      <div className="bg-shade p-10 lg:px-20 mb-20">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mb-2">
          <div className="center-element flex-col gap-4">
            <img
              src={img ? img : "/static/placeholder.jpg"}
              alt="profile-image"
              className="w-36 h-36 lg:w-52 lg:h-52 rounded-full object-cover object-center"
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
        <Error showError={err}>{textConfig.auth.verify}</Error>
      </div>
      {loading && <LoaderPage>{textConfig.loaders.userpost}</LoaderPage>}
      {!loading && fetchErr ? (
        <NotFound internalErr />
      ) : collection.length === 0 ? (
        <EmptySection isProfile />
      ) : (
        <div className="p-3 gap-10 lg:gap-16 lg:columns-2 xl:columns-3">
          {collection.documents?.map((collectionData) => (
            <MiniCard
              showStatus
              key={collectionData.$id}
              data={collectionData}
              wrapperClass={"mx-auto"}
              imgClass={"max-h-96"}
              titleClass={"group-hover/mini:text-rose-500"}
            />
          ))}
          <CardLoader />
        </div>
      )}
    </MainContainer>
  );
};

export default UserPosts;
