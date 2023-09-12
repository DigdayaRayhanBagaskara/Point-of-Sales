import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: [],
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setbrand: (state, action) => {
      state.brand = action.payload;
      const { results, count } = action.payload;
      state.count = count;
      state.brand = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addbrand: (state, action) => {
      state.brand.push(action.payload);
    },
    updatebrand: (state, action) => {
      const updatedIndex = state.brand.findIndex(
        (brand) => brand.id_brands_produk === action.payload.id_brands_produk
      );
      if (updatedIndex !== -1) {
        state.brand[updatedIndex] = action.payload;
      }
    },
    deletebrand: (state, action) => {
      state.brand = state.brand.filter(
        (brand) => brand.id_brands_produk !== action.payload
      );
    },
  },
});

export const {
  setbrand,
  addbrand,
  updatebrand,
  deletebrand,
  setSearchTerm,
  setCurrentPage,
} = brandSlice.actions;

export default brandSlice.reducer;
