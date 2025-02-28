import { appSlice } from "./app.slice";
import { WODR_QUESTIONS_IDS, WODR_QUESTIONS_MAP } from "./constants";
import { gameSlice } from "./features/Game/Game.slice";
import { EMPTY_RESULT, resultsSlice } from "./features/Results/Results.slice";
import { AppDispatch, RootState } from "./store";
import { LocalStorageItem, Result } from "./types";

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
      startTimestamp: Date.now(),
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
        ...(success || fail ? { endTimestamp: Date.now() } : {}),
      })
    );
  };

export const resetAll =
  () => (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(resultsSlice.actions.restoreResults({ results: {} }));
    dispatch(appSlice.actions.setGameId(undefined));
    dispatch(gameSlice.actions.setResult(EMPTY_RESULT));
    saveToLocalStorage({ results: {} });
  };

export const restoreResultesFromStorage =
  () => (dispatch: AppDispatch, _getState: () => RootState) => {
    const item = loadFromLocalStorage();
    if (item) dispatch(resultsSlice.actions.restoreResults(item));
    dispatch(checkExistingGame());
  };

export const checkExistingGame =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const results = getState().results.results ?? {};
    const existingGame = Object.values(results).find(
      (g) => !g.success && !g.fail
    );
    if (existingGame) dispatch(setGame(existingGame.gameId));
  };

const LOCAL_STORAGE_KEY = "HANGMAN_RESULTS";

const loadFromLocalStorage = () => {
  try {
    const jsonValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    const item: LocalStorageItem = jsonValue
      ? JSON.parse(jsonValue)
      : undefined;
    return item;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return undefined;
  }
};
export const saveToLocalStorage = (item: LocalStorageItem) => {
  try {
    const jsonValue = JSON.stringify(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
