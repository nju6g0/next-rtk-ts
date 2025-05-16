import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/interfaces";

const initialState: UserState = {
  userName: "",
  score: 0,
  loading: false,
  stage: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userName, score, stage } = action.payload;
      if (userName) {
        state.userName = userName;
      }
      if (stage) {
        state.stage = stage;
      }
      if (score) {
        state.score = score;
      }
    },
    restartGame: (state, action) => {
      state.score = 10;
    },
  },
});

export const { setUser, restartGame } = userSlice.actions;
export default userSlice.reducer;
