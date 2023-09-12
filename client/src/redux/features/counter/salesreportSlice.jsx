import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salesreport: [],
};

const salesreportSlice = createSlice({
  name: "salesreport",
  initialState,
  reducers: {
    setsalesreport(state, action) {
      state.salesreport = action.payload;
    },
    addsalesreport(state, action) {
      state.salesreport.push(action.payload);
    },
    updatesalesreport(state, action) {
      const updatedIndex = state.salesreport.findIndex(
        (salesreport) => salesreport.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.salesreport[updatedIndex] = action.payload;
      }
    },
    deletesalesreport(state, action) {
      state.salesreport = state.salesreport.filter(
        (salesreport) => salesreport.id !== action.payload
      );
    },
  },
});

export const {
  setsalesreport,
  addsalesreport,
  updatesalesreport,
  deletesalesreport,
} = salesreportSlice.actions;

export default salesreportSlice.reducer;
