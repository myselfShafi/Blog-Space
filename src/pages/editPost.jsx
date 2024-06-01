import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dbService from "../appWriteService/db.service";
import {
  EditorNote,
  LoadBtn,
  LoaderPage,
  RadioGroup,
  TextEditor,
} from "../components";
import {
  Error,
  LazyImage,
  MainContainer,
  OptionSelect,
} from "../components/shared";
import IconInput from "../components/shared/iconInput";
import { categoryList, formValidate, textConfig } from "../config";

const statusOpt = [
  { id: 1, label: "public", default: true },
  { id: 2, label: "private" },
];
const EditPost = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [post, setPosts] = useState(null);
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imgClick, setImgClick] = useState(false);

  const redirect = (category, id) => {
    setTimeout(() => {
      navigate(`/all-category/${category}/${id}`, {
        replace: true,
      });
    }, 5000);
  };
  const {
    register,
    control,
    setError,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      thumbnail: "",
      status: statusOpt[0]?.label,
    },
  });

  useEffect(() => {
    if (state?.docID) {
      dbService.getPost(state.docID).then((data) => {
        if (data) {
          reset(data);
          setPosts(data);
          setLoader(false);
          if (data?.thumbnail) {
            setImg(dbService.getFile(data?.thumbnail));
          }
        }
      });
    } else {
      setLoader(false);
    }
  }, [state]);

  const onPostSave = async (data) => {
    setLoading(true);
    try {
      if (state?.docID) {
        const file =
          data?.thumbnail !== null && data?.thumbnail[0] instanceof File
            ? await dbService.uploadFile(data?.thumbnail[0])
            : null;
        if (file && post?.thumbnail) {
          await dbService.deleteFile(post?.thumbnail, data?.category, file.$id);
        }
        const resp = await dbService.updatePost(getValues("$id"), {
          ...data,
          statusUpdated: data.status === post?.status ? false : true,
          thumbnail: file ? file.$id : post?.thumbnail,
        });
        if (resp) {
          setSuccess(true);
          redirect(resp.category, resp.$id);
        } else {
          setError("root", { type: "manual", message: resp });
        }
      } else {
        if (data?.thumbnail[0]) {
          const file = await dbService.uploadFile(data?.thumbnail[0]);
          data.thumbnail = file?.$id;
        } else {
          data.thumbnail = null;
        }
        const resp = await dbService.createPost({
          ...data,
          userID: userData?.$id,
        });
        if (resp) {
          setSuccess(true);
          redirect(resp.category, resp.$id);
        } else {
          setError("root", { type: "manual", message: resp });
        }
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
    setLoading(false);
  };

  const onImgPick = (e) => {
    const file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif"
    ) {
      setImgClick(true);
      setImg(false);
      return;
    }
    if (e.target.files && file) {
      setImgClick(true);
      setImg(URL.createObjectURL(file));
    }
  };

  if (loader) {
    return <LoaderPage>{textConfig.loaders.edit}</LoaderPage>;
  }

  return (
    <MainContainer>
      <form
        noValidate
        onSubmit={handleSubmit(onPostSave)}
        className={"xl:grid grid-cols-3 gap-9"}
      >
        <div className="col-span-2 mb-9 lg:mb-0">
          <IconInput
            label={textConfig.postEdit.title}
            hasError={errors.title}
            name={"title"}
            maxLength={300}
            className={"mb-8"}
            {...register("title", {
              required: "Title is required",
              disabled: success || loading,
            })}
          />
          <EditorNote />
          <TextEditor
            control={control}
            setError={setError}
            clearErrors={clearErrors}
            defaultValue={getValues("content")}
            hasError={errors.content}
            disabled={success || loading}
          />
        </div>
        <div>
          <OptionSelect
            name={"category"}
            control={control}
            defaultValue={getValues("category")}
            list={categoryList}
            hasError={errors.category}
            disabled={success || loading}
            label={textConfig.postEdit.category}
          />
          <h4 className="mt-8 mb-1.5 font-bold">{textConfig.postEdit.img}</h4>
          {img && (
            <LazyImage
              wrapperClass={"center-element"}
              loaderClass={"h-72 w-full bg-shade"}
              src={img}
              alt={img?.name || "post-image"}
              className="max-h-96 object-cover object-center mb-3"
            />
          )}
          <input
            type="file"
            disabled={success || loading}
            className={`w-full dark:text-white ${
              errors.thumbnail && "border-2 border-rose-500"
            }`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            name="thumbnail"
            {...register("thumbnail", {
              validate: imgClick ? formValidate.imageOnly.validate : undefined,
              onChange: (e) => onImgPick(e),
            })}
          />
          {img && !errors.thumbnail && (
            <CheckCircle className="text-green-600 mt-2 float-right" />
          )}
          {errors.thumbnail && (
            <XCircle className="text-red-600 mt-2 float-right" />
          )}
          <RadioGroup
            disabled={success || loading}
            title={
              <h4 className="mt-8 mb-1.5 font-bold">
                {textConfig.postEdit.status}
              </h4>
            }
            defaultValue={getValues("status") ?? statusOpt[0].label}
            options={statusOpt}
            control={control}
            name={"status"}
          />
          <LoadBtn
            isloading={loading}
            disabled={success}
            className={`${
              success ? "btn-contain-success animate-pulse" : "btn-contain"
            } w-full mt-8`}
          >
            {success ? textConfig.postEdit.success : textConfig.postEdit.save}
          </LoadBtn>
          {success && (
            <div className="border-2 text-green-500 text-center border-green-500 mt-8 p-2 lg:p-4">
              {textConfig.postEdit.saveSuccess}
            </div>
          )}
          {Object.entries(errors).length != 0 && (
            <div className="border-2 border-rose-500 mt-8 p-2 lg:p-4">
              <Error showError={Object.entries(errors).length != 0}>
                {Object.values(errors)[0]?.message}
              </Error>
            </div>
          )}
        </div>
      </form>
    </MainContainer>
  );
};

export default EditPost;
