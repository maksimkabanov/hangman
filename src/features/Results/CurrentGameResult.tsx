import React from "react";
import { Button } from "@mui/material";
import { appSelector } from "../../app.slice";
import { resultsSelector } from "./Results.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { startNewGame } from "../../actions";

export const CurrentGameResult = () => {
  const appState = useAppSelector(appSelector);
  const resultsState = useAppSelector(resultsSelector);

  const dispatch = useAppDispatch();

  if (appState.currentGameId) {
    return <span>Current game id: {appState.currentGameId}</span>;
  }

  const onNewGameClick = () => {
    dispatch(startNewGame());
  };

  return (
    <Button onClick={onNewGameClick} color="success">
      New game
    </Button>
  );
};
