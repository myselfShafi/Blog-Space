import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dbService from "../appWriteService/db.service";
import { AnimationIcon, DayBlog } from "../components";
import { BlogCard, Heading, MiniCard } from "../components/shared";
import { textConfig } from "../config";
import { getBlogOfDay, getRandomPosts } from "../utilities";

const Dashboard = () => {
  const lightMode = useSelector((state) => state.settings.lightMode);
  const { status, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dayBlog, setDayBlog] = useState(null);
  const [latest, setLatest] = useState(["", "", "", ""]);
  const [trend, setTrend] = useState(["", "", ""]);

  useEffect(() => {
    const run = async () => {
      try {
        const allposts = await dbService.getAllPosts();
        if (allposts) {
          setLatest(allposts.documents?.reverse().slice(0, 4));
          setDayBlog(getBlogOfDay(allposts?.documents, allposts.total));
          setTrend(getRandomPosts(allposts.documents, allposts.total, 3));
        }
      } catch (error) {
        return;
      }
    };
    run();
  }, []);

  return (
    <div>
      <div
        className={`h-full bg-gradient-light dark:bg-gradient-dark ${
          !userData?.emailVerification && status
            ? "pt-32 lg:pt-52"
            : "pt-20 lg:pt-40"
        } center-element flex-col gap-4 text-center px-3`}
      >
        <div className="grid lg:grid-cols-2 gap-y-10">
          <div className="lg:order-2 ">
            <AnimationIcon
              src={`/static/dashboard-${!lightMode ? "light" : "dark"}.json`}
              autoplay
              loop
              className={"w-full lg:w-[80%] h-full"}
            />
          </div>
          <div className="lg:order-1 center-element lg:items-end flex-col">
            <div className="text-center">
              {status && (
                <h4 className="mb-6">
                  Welcome{" "}
                  <span className="capitalize font-bold">
                    {String(userData?.name)}
                  </span>{" "}
                  !
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
            </div>
          </div>
        </div>

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
            className=" btn-contain text-2xl font-extrabold py-3 px-8 uppercase font-comic-neue"
          >
            {textConfig.auth.login2}
          </button>
        )}
      </div>
      <DayBlog data={dayBlog} />
      <div className="container my-32">
        <Heading>{textConfig.dashboard.latest}</Heading>
        <div className="my-10 card-grid">
          {latest.map((item, idx) => (
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
          {trend?.map((list, idx) => (
            <div key={idx}>
              <BlogCard data={list} />
            </div>
          ))}
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
