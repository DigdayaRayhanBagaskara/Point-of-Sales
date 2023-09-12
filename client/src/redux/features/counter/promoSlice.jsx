import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promo: [],
  keyword: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const promoSlice = createSlice({
  name: "promo",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.keyword = action.payload;
    },
    setpromo: (state, action) => {
      state.promo = action.payload;
      const { results, count } = action.payload;
      state.count = count;
      state.promo = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addpromo: (state, action) => {
      state.promo.push(action.payload);
    },
    updatepromo: (state, action) => {
      const updatedIndex = state.promo.findIndex(
        (promo) => promo.id_promo === action.payload.id_promo
      );
      if (updatedIndex !== -1) {
        state.promo[updatedIndex] = action.payload;
      }
    },
    deletepromo: (state, action) => {
      state.promo = state.promo.filter(
        (promo) => promo.id_promo !== action.payload
      );
    },
  },
});

export const {
  setpromo,
  addpromo,
  updatepromo,
  deletepromo,
  setSearchTerm,
  setCurrentPage,
} = promoSlice.actions;

export default promoSlice.reducer;
