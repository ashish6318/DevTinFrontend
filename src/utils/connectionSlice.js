import { createSlice } from "@reduxjs/toolkit";  // ✅ Ensure this is imported

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,  // Plural naming
    removeConnections: () => [],  // Plural naming for consistency
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
