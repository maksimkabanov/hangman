import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { appSlice } from "./app.slice";
import { gameSlice } from "./features/Game/Game.slice";
import { resultsSlice } from "./features/Results/Results.slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    game: gameSlice.reducer,
    results: resultsSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
