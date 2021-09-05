import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threadId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addThread: (state, action) => {
      state.threadId = action.payload.threadId;
    },
  },
});

export const { addThread } = appSlice.actions;
export const selectThreadId = (state) => state.app.threadId;

export default appSlice.reducer;
