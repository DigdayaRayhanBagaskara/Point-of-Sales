import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionreport: [],
};

const transactionreportSlice = createSlice({
  name: "transactionreport",
  initialState,
  reducers: {
    settransactionreport(state, action) {
      state.transactionreport = action.payload;
    },
    addtransactionreport(state, action) {
      state.transactionreport.push(action.payload);
    },
    updatetransactionreport(state, action) {
      const updatedIndex = state.transactionreport.findIndex(
        (transactionreport) => transactionreport.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.transactionreport[updatedIndex] = action.payload;
      }
    },
    deletetransactionreport(state, action) {
      state.transactionreport = state.transactionreport.filter(
        (transactionreport) => transactionreport.id !== action.payload
      );
    },
  },
});

export const {
  settransactionreport,
  addtransactionreport,
  updatetransactionreport,
  deletetransactionreport,
} = transactionreportSlice.actions;

export default transactionreportSlice.reducer;
