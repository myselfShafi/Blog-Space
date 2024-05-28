import React, { useState } from "react";

const LazyImage = ({
  wrapperClass,
  loaderClass,
  loaderHeight,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${wrapperClass}`}>
      {loading && (
        <div
          className={`animate-pulse ${loaderClass} ${loaderHeight} center-element gap-x-1.5`}
        >
          {new Array(3).fill(null).map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 footer-color rounded-full animate-bounce 
              }`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            ></div>
          ))}
        </div>
      )}
      <img
        onLoad={() => {
          setLoading(false);
        }}
        className={` ${loading ? "hidden" : className}`}
        {...props}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
