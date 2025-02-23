import { appSlice } from "./app.slice";
import { WODR_QUESTIONS_IDS, WODR_QUESTIONS_MAP } from "./constants";
import { gameSlice } from "./features/Game/Game.slice";
import { resultsSlice } from "./features/Results/Results.slice";
import { AppDispatch, RootState } from "./store";
import { Result } from "./types";

const LIFES_COUNT_MAX = 5;

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
    const unusedIds = WODR_QUESTIONS_IDS.filter(
      (id) => !passedGamesIdsSet.has(id)
    );
    if (unusedIds.length === 0) {
      return;
    }
    const newGameIdIndex = Math.round((unusedIds.length - 1) * Math.random());
    const newGameId = unusedIds[newGameIdIndex];
    const newGame = WODR_QUESTIONS_MAP[newGameId];

    console.log("NEW GAME", newGame);

    const lifes =
      newGame.word.length > LIFES_COUNT_MAX
        ? LIFES_COUNT_MAX
        : newGame.word.length;

    if (!newGame) return;
    const newResult: Result = {
      gameId: newGame.id,
      lifes,
      question: newGame.question,
      word: newGame.word,
      lettersUsed: [],
      success: false,
      fail: false,
    };
    dispatch(resultsSlice.actions.addResult(newResult));
    dispatch(setGame(newResult.gameId));
  };

export const guessLetter =
  (letter: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(gameSlice.actions.guessLetter(letter));

    const rootState = getState();
    const { gameId, lifes, lettersUsed, success, fail } = rootState.game;

    dispatch(
      resultsSlice.actions.updateResult({
        gameId,
        lifes,
        lettersUsed,
        success,
        fail,
      })
    );
  };
