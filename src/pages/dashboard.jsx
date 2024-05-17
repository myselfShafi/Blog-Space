import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DayBlog } from "../components";
import { BlogCard, Heading, MiniCard } from "../components/shared";
import { textConfig } from "../config";

const Dashboard = () => {
  const { status, userData } = useSelector((state) => state.auth);

  console.log({ userData, status });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const run = async () => {
  //     await authService.logout();
  //   };
  //   run();
  // }, []);

  return (
    <div>
      <div className="h-[calc(100vh-5rem)] bg-gradient-light dark:bg-gradient-dark pt-20 lg:pt-40 center-element flex-col text-center px-3">
        {status && (
          <h4 className="mb-6">
            Welcome{" "}
            <span className="capitalize font-bold">
              {String(userData?.name)}
            </span>
          </h4>
        )}
        <h5 className=" font-bold leading-[3] text-stone-800 dark:text-violet-200">
          {textConfig.dashboard.title[0]}
          <span className=" text-6xl lg:text-8xl font-extrabold">
            {textConfig.dashboard.title[1]}
          </span>
          {textConfig.dashboard.title[4]}
          <br />
          To{" "}
          <span className=" text-6xl lg:text-8xl font-extrabold">
            {textConfig.dashboard.title[3]}
          </span>
          {textConfig.dashboard.title[4]}
        </h5>
        <h4 className="my-6 font-comic-neue">
          {textConfig.dashboard.subtitle}
        </h4>
        <h6 className="my-2 tracking-widest leading-loose">
          {textConfig.dashboard.tag[0]}
          <span className="bg-pink-600/50 p-1 rounded-md text-slate-50">
            {textConfig.dashboard.tag[1]}
          </span>
          {textConfig.dashboard.tag[2]}
        </h6>
        {!status && (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="my-4 btn-contain text-2xl font-extrabold py-3 px-8 uppercase font-comic-neue"
          >
            {textConfig.auth.login2}
          </button>
        )}
      </div>
      <DayBlog />
      <div className="container my-32">
        <Heading>{textConfig.dashboard.latest}</Heading>
        <div className="my-10 card-grid">
          {[
            "https://images.unsplash.com/photo-1714409299166-de863d9598fb",
            "https://images.unsplash.com/photo-1715090156594-aaa3ed5900b9",
            3,
            "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0",
          ].map((item, idx) => (
            <MiniCard
              key={idx}
              data={item}
              imgClass={"max-h-96"}
              titleClass={"uppercase group-hover/mini:text-rose-500"}
            />
          ))}
        </div>
      </div>
      <div className="container my-32">
        <Heading>{textConfig.dashboard.article}</Heading>
        <div className="my-10">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <div className="center-element">
          <button
            className="uppercase font-extrabold btn-contain"
            onClick={() => navigate("/all-category")}
          >
            {textConfig.dashboard.all}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
