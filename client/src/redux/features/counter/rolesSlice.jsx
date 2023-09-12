import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setroles(state, action) {
      state.roles = action.payload;
    },
    addroles(state, action) {
      state.roles.push(action.payload);
    },
    updateroles(state, action) {
      const updatedIndex = state.roles.findIndex(
        (roles) => roles.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.roles[updatedIndex] = action.payload;
      }
    },
    deleteroles(state, action) {
      state.roles = state.roles.filter((roles) => roles.id !== action.payload);
    },
  },
});

export const { setroles, addroles, updateroles, deleteroles } =
  rolesSlice.actions;

export default rolesSlice.reducer;
