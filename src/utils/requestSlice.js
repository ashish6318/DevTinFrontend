import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [], 
  reducers: {
    addRequest: (state, action) => action.payload, 
    removeRequest: (state, action) => state.filter((request) => request._id !== action.payload),
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
