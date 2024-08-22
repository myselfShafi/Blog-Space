import React, { memo, useEffect, useRef, useState } from "react";
import { dbService, userService } from "../../appWriteService";

const options = {
  rootMargin: "0px 0px 300px",
};

const LazyImage = memo(
  ({
    wrapperClass,
    loaderClass,
    loaderHeight,
    dotClass,
    thumbnail,
    userThumbnail,
    loading,
    alt,
    className,
    ...props
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState("");
    let ImageRef = useRef(null);

    let src = thumbnail
      ? dbService.getFile(thumbnail)
      : userThumbnail
      ? userService.getFile(userThumbnail)
      : null;

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
          <img
            src={
              thumbnail
                ? dbService.getFile(thumbnail, 10)
                : userThumbnail
                ? userService.getFile(userThumbnail, 10)
                : null
            }
            alt={alt}
            loading="eager"
            className={`blur-sm animate-pulse ${className} `}
          />
        )}
        <img
          onLoad={() => {
            setIsLoading(false);
          }}
          ref={ImageRef}
          src={loading !== "lazy" ? src : url}
          className={` ${isLoading ? "h-0 w-0" : `${className}`}`}
          alt={alt}
          loading={loading ?? "lazy"}
          {...props}
        />
      </div>
    );
  }
);

export default LazyImage;
