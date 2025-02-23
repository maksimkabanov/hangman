import { appSlice } from "./app.slice";
import { WODR_QUESTIONS } from "./constants";
import { gameSlice } from "./features/Game/Game.slice";
import { resultsSlice } from "./features/Results/Results.slice";
import { AppDispatch, RootState } from "./store";
import { Result } from "./types";

export const setGame =
  (gameId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const rootState = getState();
    const result = rootState.results.results[gameId];
    if (result) {
      dispatch(gameSlice.actions.setResult(result));
      dispatch(appSlice.actions.setGameId(result.gameId));
    }
  };

export const startNewGame =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const rootState = getState();
    const resultsIds = Object.keys(rootState.results.results);
    const notFinishedId = resultsIds.find(
      (id) =>
        !rootState.results.results[id].fail &&
        !rootState.results.results[id].success
    );
    if (notFinishedId) return dispatch(setGame(notFinishedId));

    const passedGamesIdsSet = new Set(Object.keys(rootState.results.results));
    const newGame = WODR_QUESTIONS.find((q) => !passedGamesIdsSet.has(q.id));
    if (!newGame) return;
    const newResult: Result = {
      gameId: newGame.id,
      lifes: newGame.word.length,
      question: newGame.question,
      word: newGame.word,
      lettersUsed: [],
      success: false,
      fail: false,
    };
    dispatch(resultsSlice.actions.addResult(newResult));
    dispatch(setGame(newResult.gameId));
  };
