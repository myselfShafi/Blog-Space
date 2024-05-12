import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { TextEditor } from "../components";
import { categorylist } from "../components/navbar/categoryDrop";
import { MainContainer, OptionSelect } from "../components/shared";
import IconInput from "../components/shared/iconInput";
import { textConfig } from "../config";

const EditPost = () => {
  const [img, setImg] = useState(null);
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
    <MainContainer className={"xl:grid grid-cols-3 gap-9"}>
      <div className="col-span-2 mb-9 lg:mb-0">
        <IconInput label={textConfig.postEdit.title} className={"mb-8"} />
        <TextEditor />
      </div>
      <div>
        <OptionSelect
          list={categorylist}
          label={textConfig.postEdit.category}
        />
        <h5 className="mt-8 mb-1.5">{textConfig.postEdit.img}</h5>
        {img && (
          <div className="center-element">
            <img
              src={img}
              alt={img.name}
              className=" max-h-96 object-cover object-center mb-3"
            />
          </div>
        )}
        <input
          type="file"
          className="w-full"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={onImgPick}
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
        <button className="btn-contain w-full mt-8">
          {textConfig.postEdit.save}
        </button>
      </div>
    </MainContainer>
  );
};

export default EditPost;
