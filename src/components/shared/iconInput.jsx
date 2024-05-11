import React from "react";

const IconInput = ({ icon, className, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute top-1/2 left-2 center-element -translate-y-1/2 w-7 h-7 text-gray-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`user-input ${icon && "pl-10"} w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default React.forwardRef(IconInput);
