import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordQuestion } from "../../types";

const LIFES_COUNT_DEFAULT = 10;

const initialState = {
  lifes: LIFES_COUNT_DEFAULT,
  question: "",
  word: [] as string[],
  lettersUsed: [] as string[],
  success: false,
  fail: false,
};

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
    setGame: (state: StateType, action: PayloadAction<WordQuestion>) => {
      state.success = false;
      state.fail = false;
      state.word = action.payload.word.toLowerCase().split("");
      state.question = action.payload.question;
      state.lifes =
        action.payload.word.length > LIFES_COUNT_DEFAULT
          ? LIFES_COUNT_DEFAULT
          : action.payload.word.length;
      state.lettersUsed = [];
    },
  },
});
