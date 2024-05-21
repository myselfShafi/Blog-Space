import React from "react";
import { Controller } from "react-hook-form";

const RadioGroup = ({ title, control, name, options = [], defaultValue }) => {
  return (
    <div>
      {typeof title === "string" ? <h6>{title}</h6> : title}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <div className="grid grid-cols-2">
            {options?.map((list) => (
              <div key={list.id} className="flex items-center">
                <input
                  type="radio"
                  name="post_status"
                  id={list.label}
                  defaultChecked={list?.default}
                  onClick={() => onChange(list.label)}
                />
                <label htmlFor={list.label} className="capitalize ml-2">
                  {list.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default RadioGroup;
