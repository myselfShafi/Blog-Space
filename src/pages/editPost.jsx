import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { TextEditor } from "../components";
import { MainContainer } from "../components/shared";
import IconInput from "../components/shared/iconInput";

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
    <MainContainer className={"xl:grid grid-cols-3 "}>
      <div className="col-span-2">
        <IconInput label={"Title"} className={"mb-8"} />
        <TextEditor />
      </div>
      <div className="p-9">
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
            Unsupported file format!
            <span>
              <XCircle className="ml-2" />
            </span>
          </p>
        )}
        {img && <CheckCircle className="text-green-600 mt-2 float-right" />}
        <button className="btn-contain w-full mt-8">Save Post</button>
      </div>
    </MainContainer>
  );
};

export default EditPost;
