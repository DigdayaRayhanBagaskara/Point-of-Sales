import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategories: (state, action) => {
      const { results, count } = action.payload;
      state.count = count;
      state.categories = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      console.log("state.categories:", state.categories);
      const updatedIndex = state.categories.findIndex(
        (category) => category.id_categories === action.payload.id_categories
      );
      if (updatedIndex !== -1) {
        state.categories[updatedIndex] = action.payload;
      }
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setSearchTerm,
  setCurrentPage,
} = categorySlice.actions;

export default categorySlice.reducer;
