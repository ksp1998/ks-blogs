import { createSlice } from "@reduxjs/toolkit";
import authService from "../../appwrite/auth";

let user = null;
try {
  user = await authService.getCurrentUser();
} catch (error) {
  user = null;
}

const initialState = {
  loggodIn: Boolean(user),
  user: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggodIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
