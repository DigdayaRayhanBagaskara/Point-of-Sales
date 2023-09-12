import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: 0,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    addEmployee: (state, action) => {
      state.employee.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const updatedIndex = state.employee.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.employee[updatedIndex] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employee = state.employee.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

export const { setEmpolyee, addEmpolyee, updateEmpolyee, deleteEmpolyee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
