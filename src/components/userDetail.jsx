import React, { useState } from "react";
import { AtSign, Briefcase, Edit3, Link, Link2, User } from "react-feather";
import { useForm } from "react-hook-form";
import { textConfig } from "../config";
import { IconInput } from "./shared";

const UserDetail = ({ data, setErr }) => {
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

  const onEdit = () => {
    if (!data?.emailVerification) {
      setErr(true);
    } else {
      setEdit(!edit);
    }
  };

  return (
    <form
      className="relative grow center-element text-center flex-col gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {edit ? (
        <IconInput
          id={"name"}
          className={"user-input"}
          icon={<User />}
          {...register("name")}
        />
      ) : (
        <h5 className="font-bold capitalize">{tempData.name}</h5>
      )}
      {edit ? (
        <div className="lg:flex gap-x-3">
          <IconInput
            id={"work"}
            className={"user-input"}
            icon={<Briefcase />}
            placeholder={"type your profession"}
            {...register("work")}
          />
          <IconInput
            id={"company"}
            className={"user-input"}
            icon={<AtSign />}
            placeholder={"company|org name"}
            {...register("company")}
          />
        </div>
      ) : (
        <h6 className="font-thin">
          {tempData.work || "Your profession"} @{" "}
          <span className="font-bold">
            {tempData.company || "company/organisation"}
          </span>
        </h6>
      )}
      {edit ? (
        <IconInput
          id={"link"}
          className={"user-input"}
          icon={<Link />}
          placeholder={"enter website URL"}
          {...register("link")}
        />
      ) : (
        <div className="flex gap-x-3">
          <Link2 className="hidden lg:block" />
          <a
            target="_blank"
            href={data.link}
            className="hover:underline underline-offset-4 text-lg font-semibold"
          >
            {tempData.link || "website Link"}
          </a>
        </div>
      )}
      <button
        type={!edit ? "submit" : "button"}
        className="absolute right-0 top-0 p-0"
        onClick={onEdit}
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
