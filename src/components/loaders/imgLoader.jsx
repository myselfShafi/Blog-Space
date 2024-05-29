import React from "react";

const ImageLoader = ({ className, dotClass }) => {
  return (
    <div className={`center-element gap-x-1.5 ${className}`}>
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className={`${
            dotClass ?? "w-4 h-4"
          } footer-color rounded-full animate-bounce 
              }`}
          style={{ animationDelay: `${idx * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default ImageLoader;
