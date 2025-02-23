import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../types";
import { RootState } from "../../store";

export const resultsSelector = (state: RootState) => state.results;

const initialState = {
  results: {} as { [gameId: string]: Result },
};

type StateType = typeof initialState;

export const resultsSlice = createSlice({
  name: "RESULTS",
  initialState: initialState as StateType,
  reducers: {
    addResult: (state: StateType, action: PayloadAction<Result>) => {
      state.results[action.payload.gameId] = action.payload;
    },
  },
});
