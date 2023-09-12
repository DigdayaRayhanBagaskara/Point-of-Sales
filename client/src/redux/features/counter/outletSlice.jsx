import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outlet: [],
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const outletSlice = createSlice({
  name: "outlet",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setoutlet: (state, action) => {
      state.outlet = action.payload;
      const { results, count } = action.payload;
      state.count = count;
      state.outlet = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addoutlet: (state, action) => {
      state.outlet.push(action.payload);
    },
    updateoutlet: (state, action) => {
      const updatedIndex = state.outlet.findIndex(
        (outlet) => outlet.id_outlet === action.payload.id_outlet
      );
      if (updatedIndex !== -1) {
        state.outlet[updatedIndex] = action.payload;
      }
    },
    deleteoutlet: (state, action) => {
      state.outlet = state.outlet.filter(
        (outlet) => outlet.id_outlet !== action.payload
      );
    },
  },
});

export const {
  setoutlet,
  addoutlet,
  updateoutlet,
  deleteoutlet,
  setSearchTerm,
  setCurrentPage,
} = outletSlice.actions;

export default outletSlice.reducer;
