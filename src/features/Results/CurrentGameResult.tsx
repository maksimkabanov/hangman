import React from "react";
import { appSelector } from "../../app.slice";
import { resultsSelector } from "./Results.slice";
import { useAppSelector } from "../../store";
import { GameResult } from "./GameResult";

export const CurrentGameResult = () => {
  const appState = useAppSelector(appSelector);
  const resultsState = useAppSelector(resultsSelector);

  const currentResult = appState.currentGameId
    ? resultsState.results[appState.currentGameId]
    : undefined;

  if (currentResult && !currentResult.fail && !currentResult.success) {
    return <GameResult result={currentResult} isCurrent={true} />;
  }

  return null;
};
