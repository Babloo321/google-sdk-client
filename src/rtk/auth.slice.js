import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  accessToken: null,
  refreshToken:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  }
});

export const { setAuth } = authSlice.actions;
export const getAccessToken = (state) => state.auth?.accessToken || null;
export const getRefreshToken = (state) => state.auth?.refreshToken || null;
export const getUser = (state) => state.auth?.user || null;
export default authSlice.reducer;
