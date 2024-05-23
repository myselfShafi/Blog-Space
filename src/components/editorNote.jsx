import React from "react";

const EditorNote = () => {
  return (
    <div className="mb-9 post-border p-2 lg:p-4 flex flex-col gap-y-4 bg-shade">
      <p>
        <strong>Note : </strong> When <strong>PASTING CONTENT</strong> into the
        content editor to create your blog, please be aware:
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 px-4">
        <li className="mb-2">
          <strong className="text-gray-700 dark:text-gray-200">
            Whitespace Removal:
          </strong>{" "}
          Although your content might look correctly formatted while editing,
          extra spaces and line breaks might be removed when you submit and
          retrieve your content.
        </li>
        <li className="mb-2">
          <strong className="text-gray-700 dark:text-gray-200">
            Manual Adjustments Needed:
          </strong>{" "}
          To ensure your content maintains the correct formatting, you may need
          to manually adjust the layout.
          <ul className="list-disc list-inside ml-4 mt-2">
            <li className="mb-2">
              For{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                Paragraph Breaks
              </strong>
              , press{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                Enter
              </strong>{" "}
              where you want a new paragraph to start.
            </li>
            <li>
              For{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                Line Breaks
              </strong>{" "}
              within a paragraph, press{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                Shift + Enter
              </strong>
              .
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default EditorNote;
