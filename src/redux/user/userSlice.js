import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  currentUser: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
  },
});
export const { signinStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;
  export default userSlice.reducer;
