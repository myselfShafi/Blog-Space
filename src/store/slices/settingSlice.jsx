import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lightMode: localStorage.getItem("light") || true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightMode = !state.lightMode;
      localStorage.setItem("light", state.lightMode);
      if (state.lightMode) {
        window.document.documentElement.classList.remove("dark");
      } else {
        window.document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
