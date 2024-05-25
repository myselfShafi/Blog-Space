import React, { useEffect, useState } from "react";
import {
  AtSign,
  Briefcase,
  CheckSquare,
  Edit3,
  Link,
  Link2,
  Loader,
  User,
  XCircle,
} from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AnimationIcon } from ".";
import { userService } from "../appWriteService";
import { textConfig } from "../config";
import { authlogin } from "../store/slices/authSlice";
import UserDataLoader from "./loaders/userDataLoader";
import { IconInput } from "./shared";

const UserDetail = ({ data, setErr }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState({ state: true, err: false });
  const [updating, setUpdating] = useState({ load: false, saved: false });
  const [tempData, setTempData] = useState({});
  const [docID, setDocID] = useState(null);

  useEffect(() => {
    getUserInfo(data?.$id);
  }, [data]);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: data?.name,
      profession: "",
      company: "",
      portfolioURL: "",
    },
  });

  const getUserInfo = async (userId) => {
    try {
      const resp = await userService.getUser(userId);
      if (resp) {
        const array = resp.documents[0];
        setTempData(array);
        setDocID(array.$id);
        reset(array);
        setLoading({ state: false, err: false });
      } else {
        setLoading({ state: false, err: true });
      }
    } catch (error) {
      setLoading({ state: false, err: true });
    }
  };

  const onSubmit = async (userdata) => {
    setTempData(userdata);
    setUpdating({ load: true, saved: false });
    try {
      const resp = await userService.updateUser(docID, userdata);
      if (resp) {
        setUpdating({ load: false, saved: true });
        dispatch(authlogin({ ...userData, name: userdata?.username }));
      } else {
        setUpdating({ load: false, saved: false });
        setLoading({ state: false, err: true });
      }
    } catch (error) {
      setUpdating({ load: false, saved: false });
      setLoading({ state: false, err: true });
    }
  };

  const onEdit = () => {
    if (!data?.emailVerification) {
      setErr(true);
    } else {
      setEdit(!edit);
      setUpdating({ load: false, saved: false });
    }
  };

  if (loading.state) {
    return <UserDataLoader />;
  }

  if (loading.err) {
    return (
      <div className="relative grow center-element text-center flex-col gap-y-2">
        <AnimationIcon
          src={`/static/error.json`}
          speed={0.4}
          loop
          autoplay
          className={"w-36 h-36"}
        />
        <h6>{textConfig.errs.profile}</h6>
      </div>
    );
  }

  return (
    <form
      className="relative grow center-element text-center flex-col gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {edit ? (
        <IconInput
          id={"username"}
          className={"user-input"}
          icon={<User />}
          disabled={updating.load || updating.saved}
          {...register("username")}
        />
      ) : (
        <h5 className="font-bold capitalize">{tempData.username}</h5>
      )}
      {edit ? (
        <div className="lg:flex gap-x-3">
          <IconInput
            id={"profession"}
            className={"user-input"}
            icon={<Briefcase />}
            disabled={updating.load || updating.saved}
            placeholder={"type your profession"}
            {...register("profession")}
          />
          <IconInput
            id={"company"}
            className={"user-input"}
            icon={<AtSign />}
            disabled={updating.load || updating.saved}
            placeholder={"company|org name"}
            {...register("company")}
          />
        </div>
      ) : (
        <h6 className="font-thin">
          {tempData.profession || "Your profession"} @{" "}
          <span className="font-bold">
            {tempData.company || "company/organisation"}
          </span>
        </h6>
      )}
      {edit ? (
        <IconInput
          id={"portfolioURL"}
          className={"user-input"}
          icon={<Link />}
          disabled={updating.load || updating.saved}
          placeholder={"enter website URL"}
          {...register("portfolioURL")}
        />
      ) : (
        <div className="flex gap-x-3">
          <Link2 className="hidden lg:block" />
          <a
            target="_blank"
            href={data.link}
            className="hover:underline underline-offset-4 text-lg font-semibold"
          >
            {tempData.portfolioURL || "website Link"}
          </a>
        </div>
      )}
      <div className="py-5 lg:py-0 center-element lg:absolute right-0 top-0">
        {edit && (
          <button
            className="p-0"
            type={"submit"}
            disabled={updating.load || updating.saved}
          >
            <p
              className={`font-bold underline underline-offset-4 ${
                updating.load && "animate-pulse text-sky-600 no-underline"
              } ${updating.saved && "text-green-600 no-underline"}`}
            >
              {updating.load ? (
                <div className="center-element gap-x-2">
                  <span>{textConfig.user.saving}</span>
                  <Loader className="animate-spin" />
                </div>
              ) : updating.saved ? (
                <div className="center-element gap-x-2">
                  <span>{textConfig.user.saved}</span>
                  <CheckSquare />
                </div>
              ) : (
                textConfig.user.save
              )}
            </p>
          </button>
        )}
        <button type={"button"} onClick={onEdit} disabled={updating.load}>
          {edit ? <XCircle /> : <Edit3 />}
        </button>
      </div>
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
