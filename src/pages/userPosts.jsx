import React from "react";
import { useNavigate } from "react-router-dom";
import { CardLoader, UserDetail } from "../components";
import { MainContainer, MiniCard } from "../components/shared";
import { textConfig } from "../config";

const UserPosts = () => {
  const navigate = useNavigate();
  const img = "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4";

  const data = {
    name: "John Doe",
    work: "UI/UX Designer",
    org: "abc Org",
    link: "https://github.com/myselfShafi",
    posts: "20",
  };
  return (
    <MainContainer>
      <div className="bg-shade p-10  xl:px-52 flex flex-col lg:flex-row  gap-5 lg:gap-10  mb-20">
        <div className="center-element flex-col gap-4">
          <img
            src={img ? img : "/public/placeholder.jpg"}
            alt="profile-image"
            className="w-36 h-36 lg:w-52 lg:h-52 rounded-full object-cover object-center"
          />
        </div>
        <UserDetail data={data} />
        <div className="center-element">
          <button
            onClick={() => navigate("/edit-post")}
            className="btn-contain"
          >
            {textConfig.user.addPost}
          </button>
        </div>
      </div>
      <div className="p-3 gap-10 lg:gap-16 lg:columns-2 xl:columns-3">
        {[
          "https://images.unsplash.com/photo-1714409299166-de863d9598fb",
          "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0",
          "https://images.unsplash.com/photo-1715090156594-aaa3ed5900b9",
          2,
          "https://images.unsplash.com/photo-1505144808419-1957a94ca61e",
          "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
          3,
        ].map((item, idx) => (
          <MiniCard
            key={idx}
            data={item}
            wrapperClass={"mx-auto"}
            imgClass={"max-h-96"}
            titleClass={"group-hover/mini:text-rose-500"}
          />
        ))}
        <CardLoader />
      </div>
    </MainContainer>
  );
};

export default UserPosts;
