"use client";

import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const ThemeMode = () => {
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {
    if (!lightMode) {
      localStorage.setItem("light", false);
      window.document.documentElement.classList.add("dark");
    } else if (lightMode) {
      localStorage.setItem("light", true);
      window.document.documentElement.classList.remove("dark");
    } else {
      setLightMode(localStorage.getItem("light") === true);
    }
  }, [lightMode]);

  const handletheme = () => {
    setLightMode(!lightMode);
  };

  return (
    <button onClick={handletheme}>
      {lightMode ? (
        <MoonIcon className="size-8" />
      ) : (
        <LightBulbIcon className="size-8" />
      )}
    </button>
  );
};

export default ThemeMode;
