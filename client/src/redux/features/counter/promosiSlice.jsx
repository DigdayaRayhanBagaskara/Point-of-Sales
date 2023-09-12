import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promosi: [],
};

const promosiSlice = createSlice({
  name: "promosi",
  initialState,
  reducers: {
    setpromosi(state, action) {
      state.promosi = action.payload;
    },
    addpromosi(state, action) {
      state.promosi.push(action.payload);
    },
    updatepromosi(state, action) {
      const updatedIndex = state.promosi.findIndex(
        (promosi) => promosi.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.promosi[updatedIndex] = action.payload;
      }
    },
    deletepromosi(state, action) {
      state.promosi = state.promosi.filter(
        (promosi) => promosi.id !== action.payload
      );
    },
  },
});

export const { setpromosi, addpromosi, updatepromosi, deletepromosi } =
  promosiSlice.actions;

export default promosiSlice.reducer;
