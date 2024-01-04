import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggodIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggodIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
