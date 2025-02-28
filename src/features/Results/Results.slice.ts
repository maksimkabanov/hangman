import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageItem, Result } from "../../types";
import { RootState } from "../../store";
import { saveToLocalStorage } from "../../actions";

export const resultsSelector = (state: RootState) => state.results;

export const EMPTY_RESULT: Result = {
  gameId: "",
  lifes: 0,
  question: "",
  word: "",
  lettersUsed: [],
  success: false,
  fail: false,
  startTimestamp: 0,
  endTimestamp: undefined,
};

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
      const results = {} as { [gameId: string]: Result };

      Object.values(action.payload.results).forEach((r) => {
        if (
          r.word &&
          r.question &&
          r.gameId &&
          r.lettersUsed &&
          r.startTimestamp
        ) {
          results[r.gameId] = r;
        }
      });

      state.results = results;
    },
  },
});
