import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";

const IconInput = (
  {
    label,
    id,
    icon,
    type,
    pwdInput,
    endIcon,
    className,
    wrapperClass,
    ...props
  },
  ref
) => {
  const [mask, setMask] = useState(true);

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className="font-bold text-2xl inline-block mb-1.5">
          {label} :
        </label>
      )}
      <div className="relative">
        <div
          className={`absolute top-1/2 ${
            endIcon ? "right-2" : "left-2"
          } center-element -translate-y-1/2 w-7 h-7 text-gray-500`}
        >
          {icon && icon}
          {pwdInput && (
            <button onClick={() => setMask(!mask)}>
              {mask ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>
        <input
          id={id}
          type={type || (pwdInput && (mask ? "password" : "text"))}
          className={`${
            (pwdInput || icon) && endIcon ? "pr-10" : "pl-10"
          } w-full ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(IconInput);
