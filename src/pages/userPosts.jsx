import React from "react";
import { Edit3, Link2 } from "react-feather";
import { CardLoader } from "../components";
import { MainContainer, MiniCard } from "../components/shared";
import { textConfig } from "../config";

const UserPosts = () => {
  const img = "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4";
  return (
    <MainContainer>
      <div className="bg-shade p-10  xl:px-52 flex flex-col lg:flex-row  gap-5 lg:gap-10  mb-20">
        <div className="center-element flex-col gap-4">
          <img
            src={img ? img : "/public/placeholder.jpg"}
            alt="profile-image"
            className="w-36 h-36 lg:w-48 lg:h-48 rounded-full object-cover object-center"
          />
        </div>
        <div className="relative grow center-element flex-col gap-y-2">
          <i className="absolute right-0 top-0">
            <Edit3 />
          </i>
          <h5 className="font-bold">John Doe</h5>
          <h6 className="font-thin">
            UI/UX designer @ <span className="font-bold">abc org</span>
          </h6>
          <div className="flex gap-x-3">
            <Link2 className="hidden lg:block" />
            <a
              target="_blank"
              href="https://github.com/myselfShafi"
              className="hover:underline underline-offset-4 text-lg font-semibold"
            >
              https://github.com/myselfShafi
            </a>
          </div>
          <h6 className="font-bold my-4 lg:mt-10">
            {textConfig.user.total}
            <span className="font-normal footer-color p-1.5 rounded-full ml-2">
              20
            </span>
          </h6>
        </div>
        <div className="center-element">
          <button className="btn-contain">{textConfig.user.addPost}</button>
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
