import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "@/interfaces";

const initialState: AuthState = {
  hasAuth: false,
  name: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { name } = action.payload;
      state.hasAuth = true;
      state.name = name;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
