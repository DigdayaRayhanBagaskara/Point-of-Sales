import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    addProduct: (state, action) => {
      state.product.push(action.payload);
    },
    updateProduct: (state, action) => {
      const updatedIndex = state.product.findIndex(
        (product) => product.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.product[updatedIndex] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.product = state.product.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setProduct, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
