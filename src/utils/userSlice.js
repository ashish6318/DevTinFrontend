import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload, // Fix mutation issue
    removeUser: () => null, // No need for (state, action)
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer; // 
