import React from "react";
import { Button } from "@mui/material";
import { appSelector } from "../../app.slice";
import { resultsSelector } from "./Results.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { startNewGame } from "../../actions";

export const CurrentGameResult = () => {
  const appState = useAppSelector(appSelector);
  const resultsState = useAppSelector(resultsSelector);

  const currentResult = appState.currentGameId
    ? resultsState.results[appState.currentGameId]
    : undefined;

  const dispatch = useAppDispatch();

  if (currentResult && !currentResult.fail && !currentResult.success) {
    return (
      <div className="flex flex-col gap-1">
        <span>Lifes left: {currentResult.lifes}</span>
        <span>Tries: {currentResult.lettersUsed.length}</span>
        <span>
          {currentResult.success
            ? "SUCCESS"
            : currentResult.fail
            ? "FAILED"
            : "PLAYING"}
        </span>
      </div>
    );
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
