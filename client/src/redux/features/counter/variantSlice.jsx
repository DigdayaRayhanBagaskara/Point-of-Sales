import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variant: [],
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const variantSlice = createSlice({
  name: "variant",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setvariant: (state, action) => {
      const { results, count } = action.payload;
      state.count = count;
      state.variant = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addvariant: (state, action) => {
      state.variant.push(action.payload);
    },
    updatevariant: (state, action) => {
      console.log("state.variant:", state.variant);
      const updatedIndex = state.variant.findIndex(
        (variant) =>
          variant.id_produk_variant === action.payload.id_produk_variant
      );
      if (updatedIndex !== -1) {
        state.variant[updatedIndex] = action.payload;
      }
    },

    deletevariant: (state, action) => {
      state.variant = state.variant.filter(
        (variant) => variant.id !== action.payload
      );
    },
  },
});

export const {
  setvariant,
  addvariant,
  updatevariant,
  deletevariant,
  setSearchTerm,
  setCurrentPage,
} = variantSlice.actions;

export default variantSlice.reducer;
