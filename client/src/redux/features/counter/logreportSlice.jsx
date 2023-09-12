import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logreport: [],
};

const logreportSlice = createSlice({
  name: "logreport",
  initialState,
  reducers: {
    setlogreport(state, action) {
      state.logreport = action.payload;
    },
    addlogreport(state, action) {
      state.logreport.push(action.payload);
    },
    updatelogreport(state, action) {
      const updatedIndex = state.logreport.findIndex(
        (logreport) => logreport.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.logreport[updatedIndex] = action.payload;
      }
    },
    deletelogreport(state, action) {
      state.logreport = state.logreport.filter(
        (logreport) => logreport.id !== action.payload
      );
    },
  },
});

export const { setlogreport, addlogreport, updatelogreport, deletelogreport } =
  logreportSlice.actions;

export default logreportSlice.reducer;
