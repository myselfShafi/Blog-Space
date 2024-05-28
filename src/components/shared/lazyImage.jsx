import React, { useState } from "react";
import ImageLoader from "../loaders/imgLoader";

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
        <ImageLoader
          className={`animate-pulse ${loaderClass} ${loaderHeight} `}
        />
      )}
      <img
        onLoad={() => {
          setLoading(false);
        }}
        className={`transition-opacity duration-1000 ${
          loading ? "h-0 opacity-0" : `${className} opacity-100`
        }`}
        {...props}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
