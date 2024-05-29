import { useLayoutEffect, useState } from "react";

const useImgDimensions = (imgURL = null) => {
  const [dimensions, setDimensions] = useState({});

  useLayoutEffect(() => {
    if (!imgURL) return;

    let img = new Image();
    img.src = imgURL;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };

    return () => {
      img.onload = null;
    };
  }, [imgURL]);

  return dimensions;
};

export default useImgDimensions;
