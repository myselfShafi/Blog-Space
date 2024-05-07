import React from "react";
import { getTruncatedText } from "../../utilities";

const MiniCard = () => {
  const string = "iPad Pro M1 Chip: Bringing The MacBook Pro Powersgdfh";
  const truncText = getTruncatedText(string, 48);
  return (
    <a href="/">
      <div className="xl:max-w-[20vw] post-border border-0 lg:border group/mini">
        <img
          src="https://images.unsplash.com/photo-1653103674098-6ed995323607"
          alt="mini-card"
          className="w-full h-72 object-cover object-center"
        />
        <div className="p-8 group-hover/mini:text-purple-600 transition-colors duration-200">
          <h5>{truncText}</h5>
        </div>
      </div>
    </a>
  );
};

export default MiniCard;
