import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const appSelector = (state: RootState) => state.app;

const initialState = {
  currentGameId: undefined as string | undefined,
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
    setGameId: (
      state: StateType,
      action: PayloadAction<string | undefined>
    ) => {
      state.currentGameId = action.payload;
    },
  },
});
