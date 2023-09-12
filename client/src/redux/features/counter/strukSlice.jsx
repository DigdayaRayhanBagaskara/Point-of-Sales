import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  struk: [],
};

const strukSlice = createSlice({
  name: "struk",
  initialState,
  reducers: {
    setstruk(state, action) {
      state.struk = action.payload;
    },
    addstruk(state, action) {
      state.struk.push(action.payload);
    },
    updatestruk(state, action) {
      const updatedIndex = state.struk.findIndex(
        (struk) => struk.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.struk[updatedIndex] = action.payload;
      }
    },
    deletestruk(state, action) {
      state.struk = state.struk.filter((struk) => struk.id !== action.payload);
    },
  },
});

export const { setstruk, addstruk, updatestruk, deletestruk } =
  strukSlice.actions;

export default strukSlice.reducer;
