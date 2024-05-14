import React from "react";

const IconInput = (
  { label, id, icon, endIcon, className, wrapperClass, ...props },
  ref
) => {
  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className="font-bold text-2xl inline-block mb-1.5">
          {label} :
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`absolute top-1/2 ${
              endIcon ? "right-2" : "left-2"
            } center-element -translate-y-1/2 w-7 h-7 text-gray-500`}
          >
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`${
            icon && endIcon ? "pr-10" : "pl-10"
          } w-full ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(IconInput);
