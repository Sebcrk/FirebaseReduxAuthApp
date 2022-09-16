import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, toggler: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    increase: (state, action) => {
      state.counter += action.payload;
    },
    clear: (state) => {
      state.counter = 0;
    },
    toggle: (state) => {
      state.toggler = !state.toggler;
    },
  },
});

export const { increment, decrement, increase, clear, toggle } =
  counterSlice.actions;
export default counterSlice.reducer;
