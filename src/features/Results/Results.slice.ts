import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../types";

const initialState = {
  results: [] as Result[],
  currentGame: undefined as Result | undefined,
};

type StateType = typeof initialState;

export const resultsSlice = createSlice({
  name: "RESULTS",
  initialState: initialState as StateType,
  reducers: {
    addResult: (state: StateType, action: PayloadAction<Result>) => {
      state.results.push(action.payload);
    },
  },
});
