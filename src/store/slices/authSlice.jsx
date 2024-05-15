import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authlogin: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    authlogout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { authlogin, authlogout } = authSlice.actions;

export default authSlice.reducer;
