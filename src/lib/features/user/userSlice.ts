import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/interfaces";

const initialState: UserState = {
  userName: "",
  score: 0,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userName, score } = action.payload;
      state.userName = userName;
      state.score = score;
    },
    restartGame: (state, action) => {
      state.score = 10;
    },
  },
});

export const { setUser, restartGame } = userSlice.actions;
export default userSlice.reducer;
