import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("martlyUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isLoggedIn: !!savedUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("martlyUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("martlyUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
