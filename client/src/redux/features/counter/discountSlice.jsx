import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount: [],
  keyword: "",
  currentPage: 1,
  itemsPerPage: 5,
};
export const discountSlice = createSlice({
  name: "discount",
  initialState: initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.keyword = action.payload;
    },
    setDiscount: (state, action) => {
      const { results, count } = action.payload;
      state.count = count;
      state.discount = results.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    adddiscount: (state, action) => {
      state.discount.push(action.payload);
    },
    updatediscount: (state, action) => {
      console.log("state.dicount:", state.discount);
      const updatedIndex = state.discount.findIndex(
        (discount) => discount.id_discount === action.payload.id_discount
      );
      if (updatedIndex !== -1) {
        state.discount[updatedIndex] = action.payload;
      }
    },

    deletediscount: (state, action) => {
      state.discount = state.discount.filter(
        (discount) => discount.id_discount !== action.payload
      );
    },
  },
});

export const {
  setdiscount,
  adddiscount,
  updatediscount,
  deletediscount,
  setSearchTerm,
  setCurrentPage,
} = discountSlice.actions;

export default discountSlice.reducer;
