import { RootState } from "./store";

export const gameSelector = (state: RootState) => state.game;
export const resultsSelector = (state: RootState) => state.results;
