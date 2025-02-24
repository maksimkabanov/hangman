import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageItem, Result } from "../../types";
import { RootState } from "../../store";
import { saveToLocalStorage } from "../../actions";

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
      saveToLocalStorage(state);
    },
    updateResult: (
      state: StateType,
      action: PayloadAction<Partial<Result>>
    ) => {
      if (action.payload.gameId) {
        state.results[action.payload.gameId] = {
          ...state.results[action.payload.gameId],
          ...action.payload,
        };
        saveToLocalStorage(state);
      }
    },
    restoreResults: (
      state: StateType,
      action: PayloadAction<LocalStorageItem>
    ) => {
      state.results = action.payload.results;
    },
  },
});
