import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  playerName: "Ivan Ivanov",
};

type StateType = typeof initialState;

export const appSlice = createSlice({
  name: "APP",
  initialState: initialState as StateType,
  reducers: {
    changeName: (state: StateType, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
  },
});
