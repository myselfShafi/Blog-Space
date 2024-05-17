import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const AnimationIcon = ({ src, ...props }, ref) => {
  return (
    <div>
      {src && <Player ref={ref} src={src} autoplay keepLastFrame {...props} />}
    </div>
  );
};

export default React.forwardRef(AnimationIcon);
