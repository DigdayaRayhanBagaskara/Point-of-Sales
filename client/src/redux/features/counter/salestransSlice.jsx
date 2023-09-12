import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salestrans: [],
};

const salestransSlice = createSlice({
  name: "salestrans",
  initialState,
  reducers: {
    setsalestrans(state, action) {
      state.salestrans = action.payload;
    },
    addsalestrans(state, action) {
      state.salestrans.push(action.payload);
    },
    updatesalestrans(state, action) {
      const updatedIndex = state.salestrans.findIndex(
        (salestrans) => salestrans.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.salestrans[updatedIndex] = action.payload;
      }
    },
    deletesalestrans(state, action) {
      state.salestrans = state.salestrans.filter(
        (salestrans) => salestrans.id !== action.payload
      );
    },
  },
});

export const {
  setsalestrans,
  addsalestrans,
  updatesalestrans,
  deletesalestrans,
} = salestransSlice.actions;

export default salestransSlice.reducer;
