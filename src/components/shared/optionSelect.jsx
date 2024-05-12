import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import { textConfig } from "../../config";
import Dropdown from "./dropdown";

const OptionSelect = ({ label, list = [] }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const otherInput = () => {
    if (newCategory.match(/[^A-Za-z\s]/g)) {
      alert("Post Category: special chars and no. not allowed");
    } else {
      setSelected(newCategory), setOpen(!open);
    }
  };

  return (
    <div>
      <div className="font-bold text-2xl inline-block mb-1.5">
        <label htmlFor="option-menu">{label}</label>
      </div>
      <Dropdown
        id="option-menu"
        title={
          <button
            className="w-full outline outline-2 outline-gray-200 dark:outline-gray-600 flex items-center"
            onClick={() => setOpen(!open)}
          >
            <h6 className="grow">
              {selected ? selected : textConfig.postEdit.option}
            </h6>
            <ChevronDown
              className={`size-4 ${
                open && "rotate-180"
              } transition-transform duration-300 transform`}
            />
          </button>
        }
        optionClass={"right-0 py-5 mt-1 w-full"}
        isOpen={open}
      >
        <ul className="divide-y divide-gray-300 dark:divide-gray-600">
          <div>
            {list.map((li) => (
              <OptionList
                key={li.id}
                selected={selected}
                tabIndex={li.id || "-1"}
                id={li.id || "id-0"}
                onClick={() => {
                  setSelected(li?.title), setOpen(!open);
                }}
              >
                {li?.title}
              </OptionList>
            ))}
          </div>
          <OptionList
            selected={selected}
            tabIndex={"-1"}
            id={list.length + 1}
            onClick={otherInput}
          >
            {textConfig.postEdit.other}{" "}
            <input
              type="text"
              pattern="[A-Za-z\s]+"
              className="dark:text-gray-900"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </OptionList>
        </ul>
      </Dropdown>
    </div>
  );
};

const OptionList = ({ selected, children, ...props }) => {
  return (
    <li
      className={`cursor-pointer text-gray-700 dark:text-gray-300 block px-5 py-1.5 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-100 dark:hover:bg-gray-700 ${
        selected === "other" && "bg-gray-300 dark:bg-gray-500"
      } `}
      role="menuitem"
      {...props}
    >
      {children}
    </li>
  );
};

export default OptionSelect;
