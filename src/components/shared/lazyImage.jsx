import React, { useEffect, useRef, useState } from "react";
import ImageLoader from "../loaders/imgLoader";

const options = {
  rootMargin: "0px 0px 300px",
};

const LazyImage = ({
  wrapperClass,
  loaderClass,
  loaderHeight,
  src,
  dotClass,
  loading,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");
  let ImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setUrl(src);
          self.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(ImageRef.current);

    return () => {
      if (ImageRef && ImageRef.current) {
        observer.unobserve(ImageRef.current);
      }
    };
  }, [src]);

  return (
    <div className={`relative ${wrapperClass}`}>
      {isLoading && (
        <ImageLoader
          dotClass={dotClass}
          className={`animate-pulse ${loaderClass} ${loaderHeight} `}
        />
      )}
      <img
        onLoad={() => {
          setIsLoading(false);
        }}
        ref={ImageRef}
        src={loading ? src : url}
        className={`transition-opacity duration-1000 ${
          isLoading ? "h-0 w-0 opacity-0" : `${className} opacity-100`
        }`}
        {...props}
        loading={loading ?? "lazy"}
      />
    </div>
  );
};

export default LazyImage;
