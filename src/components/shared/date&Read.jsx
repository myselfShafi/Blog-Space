import React from "react";

const DateNRead = ({ date, duration, durationClass, children }) => {
  return (
    <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
      <p>{date}</p>
      {duration && (
        <>
          <div className="w-1 h-1 rounded-full bg-gray-500 mx-1"></div>
          <p className={durationClass}>{duration}</p>
        </>
      )}
      {children}
    </div>
  );
};

export default DateNRead;
