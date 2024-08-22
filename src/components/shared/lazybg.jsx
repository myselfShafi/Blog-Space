import React, { useEffect, useState } from "react";
import { dbService } from "../../appWriteService";

const LazyBg = ({ wrapperClass, className, thumbnail, children, ...props }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let image = new Image();
    image.src = dbService.getFile(thumbnail);
    image.loading = "lazy";

    image.onload = () => setLoading(false);
    image.onerror = () => setLoading(false);
  }, [dbService.getFile(thumbnail)]);

  return (
    <div className={`relative ${wrapperClass} `}>
      <div
        className={`${className} }`}
        style={{
          backgroundImage: `url(${
            loading
              ? dbService.getFile(thumbnail, 5)
              : dbService.getFile(thumbnail)
          })`,
        }}
        {...props}
      >
        <div
          className={`h-full w-full items-center justify-center flex transition-all duration-500 ${
            loading ? "backdrop-blur-sm" : `backdrop-blur-0`
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LazyBg;
