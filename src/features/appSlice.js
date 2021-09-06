import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threadId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectThread: (state, action) => {
      state.threadId = action.payload.threadId;
    },
  },
});

export const { selectThread } = appSlice.actions;
export const selectThreadId = (state) => state.app.threadId;

export default appSlice.reducer;
