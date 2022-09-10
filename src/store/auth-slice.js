import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: {}, token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuthenticated = false;
      state.user = {};
      state.token = "";
    },
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload.isAuth;
      state.user = action.payload.currentUser;
      state.token = action.payload.token;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
