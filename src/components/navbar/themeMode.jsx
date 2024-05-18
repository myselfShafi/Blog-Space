"use client";

import React from "react";
import { Moon, Sun } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/settingSlice";

const ThemeMode = () => {
  const dispatch = useDispatch();
  const lightMode = useSelector((state) => state.settings.lightMode);

  const handletheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <i className="cursor-pointer" onClick={handletheme}>
      {lightMode ? <Sun /> : <Moon />}
    </i>
  );
};

export default ThemeMode;
