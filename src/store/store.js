import { configureStore } from "@reduxjs/toolkit";
import { authSlice, settingsSlice } from "./slices";

const store = configureStore({
  reducer: { auth: authSlice, settings: settingsSlice },
});

export default store;
