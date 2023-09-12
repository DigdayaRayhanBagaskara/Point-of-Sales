import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser(state, action) {
      state.user = action.payload;
    },
    adduser(state, action) {
      state.user.push(action.payload);
    },
    updateuser(state, action) {
      const updatedIndex = state.user.findIndex(
        (user) => user.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.user[updatedIndex] = action.payload;
      }
    },
    deleteuser(state, action) {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setuser, adduser, updateuser, deleteuser } = userSlice.actions;

export default userSlice.reducer;
