import { createSlice } from "@reduxjs/toolkit";

const initialGuestInfoState = { guests: {}, occupancy: "", maxOccupancy: 10 };
const guestInfoSlice = createSlice({
  name: "guestInfo",
  initialState: initialGuestInfoState,
  reducers: {
    totalOccupancy: (state, action) => {
      state.occupancy = action.payload.currentOccupancy;
    },
    guestsInfo: (state, action) => {
      state.guests = action.payload.guests;
    },
  },
});

export const { totalOccupancy, guestsInfo } = guestInfoSlice.actions;
export default guestInfoSlice.reducer;
