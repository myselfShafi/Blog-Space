import React, { useState } from "react";
import { AtSign, Briefcase, Edit3, Link, Link2, User } from "react-feather";
import { useForm } from "react-hook-form";
import { textConfig } from "../config";
import { IconInput } from "./shared";

const UserDetail = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const [tempData, setTempData] = useState({
    name: data?.name || "",
    work: data?.work || "",
    company: data?.org || "",
    link: data?.link || "",
  });

  const { register, handleSubmit } = useForm({ defaultValues: tempData });

  const onSubmit = (userdata) => {
    console.log(data, tempData);
    setTempData(userdata);
  };

  return (
    <form
      className="relative grow center-element text-center flex-col gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {edit ? (
        <IconInput icon={<User />} {...register("name")} />
      ) : (
        <h5 className="font-bold">{tempData.name}</h5>
      )}
      {edit ? (
        <div className="lg:flex gap-x-3">
          <IconInput icon={<Briefcase />} {...register("work")} />
          <IconInput icon={<AtSign />} {...register("company")} />
        </div>
      ) : (
        <h6 className="font-thin">
          {tempData.work} @{" "}
          <span className="font-bold">{tempData.company}</span>
        </h6>
      )}
      {edit ? (
        <IconInput icon={<Link />} {...register("link")} />
      ) : (
        <div className="flex gap-x-3">
          <Link2 className="hidden lg:block" />
          <a
            target="_blank"
            href={data.link}
            className="hover:underline underline-offset-4 text-lg font-semibold"
          >
            {tempData.link}
          </a>
        </div>
      )}
      <button
        type={!edit ? "submit" : "button"}
        className="absolute right-0 top-0 p-0"
        onClick={() => setEdit(!edit)}
      >
        {edit ? (
          <p className="font-bold underline underline-offset-2">
            {textConfig.user.save}
          </p>
        ) : (
          <Edit3 />
        )}
      </button>

      {data.posts && (
        <h6 className={`font-bold my-4 ${!edit && "lg:mt-10"}`}>
          {textConfig.user.total}
          <span className="font-normal footer-color p-1.5 rounded-full ml-2">
            {data.posts}
          </span>
        </h6>
      )}
    </form>
  );
};

export default UserDetail;
