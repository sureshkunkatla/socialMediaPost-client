import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
  },
  reducers: {
    addPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
