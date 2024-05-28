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
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  let ImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setUrl(src);
          self.unobserve(entry.target);
          console.log("is intersecting...");
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
      {loading && (
        <ImageLoader
          className={`animate-pulse ${loaderClass} ${loaderHeight} `}
        />
      )}
      <img
        onLoad={() => {
          setLoading(false);
        }}
        ref={ImageRef}
        src={url}
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
