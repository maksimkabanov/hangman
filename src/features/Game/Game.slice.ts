import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../types";

export const EMPTY_GAME = {
  gameId: undefined as string | undefined,
  lifes: 0,
  question: "",
  word: [] as string[],
  lettersUsed: [] as string[],
  success: false,
  fail: false,
};

const initialState = { ...EMPTY_GAME };

type StateType = typeof initialState;

export const gameSlice = createSlice({
  name: "GAME",
  initialState: initialState as StateType,
  reducers: {
    guessLetter: (state: StateType, action: PayloadAction<string>) => {
      const isCorrect = state.word.indexOf(action.payload) !== -1;
      if (!isCorrect) state.lifes--;
      state.lettersUsed.push(action.payload);
      const lettersUsedSet = new Set(state.lettersUsed);
      if (state.lifes === 0) {
        state.fail = true;
      } else if (
        state.word.every((wordLetter) => lettersUsedSet.has(wordLetter))
      ) {
        state.success = true;
      }
    },
    setResult: (state: StateType, action: PayloadAction<Result>) => {
      state.gameId = action.payload.gameId;
      state.success = action.payload.success;
      state.fail = action.payload.fail;
      state.word = action.payload.word.toLowerCase().split("");
      state.question = action.payload.question;
      state.lifes = action.payload.lifes;
      state.lettersUsed = action.payload.lettersUsed;
    },
    resetGame: (state: StateType) => {
      state.gameId = initialState.gameId;
      state.success = initialState.success;
      state.fail = initialState.fail;
      state.word = initialState.word;
      state.question = initialState.question;
      state.lifes = initialState.lifes;
      state.lettersUsed = initialState.lettersUsed;
    },
  },
});
