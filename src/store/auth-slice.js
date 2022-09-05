import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: null, token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null
      state.token = null
    },
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload.isAuth
      state.user = action.payload.currentUser
    }
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
