import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dbService from "../appWriteService/db.service";
import { RadioGroup, TextEditor } from "../components";
import { categorylist } from "../components/navbar/categoryDrop";
import { Error, MainContainer, OptionSelect } from "../components/shared";
import IconInput from "../components/shared/iconInput";
import { formValidate, textConfig } from "../config";

const statusOpt = [
  { id: 1, label: "public", default: true },
  { id: 2, label: "private" },
];
const EditPost = () => {
  const { userData } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);

  const defaultValues = {
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    status: statusOpt[0]?.label,
  };

  const {
    register,
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onPostSave = async (data) => {
    data = { ...data, userID: userData?.$id };
    try {
      const resp = await dbService.createPost(data);
      if (resp) {
        console.log(resp);
      } else {
        setError("root", { type: "manual", message: resp });
      }
    } catch (error) {
      setError("root", { type: "manual", message: error.message });
    }
  };

  const onImgPick = (e) => {
    const file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif"
    ) {
      setImg(false);
      return;
    }
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };

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
            className={"mb-8"}
            {...register("title", {
              ...formValidate.textOnly,
              required: "Title is required",
            })}
          />
          <TextEditor
            control={control}
            defaultValue={""}
            hasError={errors.content}
          />
        </div>
        <div>
          <OptionSelect
            name={"category"}
            control={control}
            list={categorylist}
            hasError={errors.category}
            label={textConfig.postEdit.category}
          />
          <h5 className="mt-8 mb-1.5">{textConfig.postEdit.img}</h5>
          {img && (
            <div className="center-element">
              <img
                src={img}
                alt={img.name}
                className="max-h-96 object-cover object-center mb-3"
              />
            </div>
          )}
          <input
            type="file"
            className="w-full dark:text-white"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={onImgPick}
            name="thumbnail"
            {...register("thumbnail")}
          />
          {img === false && (
            <p className="text-red-600 mt-2 float-right center-element">
              {textConfig.postEdit.format}
              <span>
                <XCircle className="ml-2" />
              </span>
            </p>
          )}
          {img && <CheckCircle className="text-green-600 mt-2 float-right" />}
          <RadioGroup
            title={
              <h5 className="mt-8 mb-1.5">{textConfig.postEdit.status}</h5>
            }
            defaultValue={statusOpt[0].label}
            options={statusOpt}
            control={control}
            name={"status"}
          />
          <button className="btn-contain w-full mt-8">
            {textConfig.postEdit.save}
          </button>
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
