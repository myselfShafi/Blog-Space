"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

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
    <i className="cursor-pointer" onClick={handletheme}>
      {lightMode ? <Moon /> : <Sun />}
    </i>
  );
};

export default ThemeMode;
