import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";
import { envConfig, textConfig } from "../config";

const TextEditor = ({
  control,
  hasError,
  setError,
  clearErrors,
  disabled,
  defaultValue = "",
}) => {
  return (
    <div>
      <label
        htmlFor={"text-editor"}
        className="font-bold text-2xl inline-block mb-1.5"
      >
        {textConfig.postEdit.content}
      </label>
      <Controller
        name="content"
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field: { onChange } }) => (
          <div
            className={`${hasError && "border-2 border-rose-400 rounded-xl"}`}
          >
            <Editor
              id="text-editor"
              onEditorChange={onChange}
              apiKey={envConfig.tinymceApi}
              initialValue={defaultValue}
              disabled={disabled}
              init={{
                height: "75vh",
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                paste_as_text: true,
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                ui_mode: "split",
                branding: false,
                setup: (editor) => {
                  var maxChar = 25000;
                  editor.on("input", (e) => {
                    var numChar = editor.getContent({ format: "text" });
                    if (numChar.length > maxChar) {
                      setError("content", {
                        type: "text",
                        message: "Maximum " + maxChar + " characters allowed.",
                      });
                      editor.setContent(numChar.substring(0, maxChar));
                      e.preventDefault();
                      return false;
                    }
                  });
                },
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default TextEditor;
