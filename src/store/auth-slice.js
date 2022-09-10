import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: {}, token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {}
      state.token = ""
    },
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload.isAuth
      state.user = action.payload.currentUser
      state.token = action.payload.token
    }
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
