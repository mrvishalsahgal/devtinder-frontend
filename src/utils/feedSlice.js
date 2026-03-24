import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // This likely sets state to { data: [...] }
    },
    removeFeed: (state, action) => {
      // 1. Check if state and state.data exist to avoid errors
      if (state && state.data) {
        // 2. Filter the array inside state.data
        // Based on your image, the user object HAS the _id directly (no .data wrapper)
        state.data = state.data.filter((user) => user._id !== action.payload);
      }
      return state;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
