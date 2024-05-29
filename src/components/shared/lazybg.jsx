import React, { useEffect, useState } from "react";

const LazyBg = ({ wrapperClass, className, imgURL, children, ...props }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let image = new Image();
    image.src = imgURL;
    image.loading = "lazy";

    image.onload = () => setLoading(false);
    image.onerror = () => setLoading(false);
  }, [imgURL]);

  return (
    <div className={`relative ${wrapperClass}`}>
      {loading && (
        <div
          className={`absolute animate-pulse bg-shade w-full h-full center-element`}
        >
          {children}
        </div>
      )}
      <div
        className={`transition-opacity duration-1000 ${
          loading ? "h-0 opacity-0" : `${className} opacity-100`
        }`}
        style={
          loading
            ? {}
            : { backgroundImage: `url(${imgURL ?? "/static/banner.jpg"})` }
        }
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default LazyBg;
