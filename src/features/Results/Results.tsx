import React, { useMemo } from "react";
import { GameResult } from "./GameResult";
import { resultsSelector } from "./Results.slice";
import { useAppSelector } from "../../store";
import { CurrentGameResult } from "./CurrentGameResult";
import { NewGameButton } from "../../components/NewGameButton";
import { appSelector } from "../../app.slice";

export const Results = () => {
  const resultsState = useAppSelector(resultsSelector);
  const appState = useAppSelector(appSelector);

  const resultsArray = useMemo(
    () =>
      Object.values(resultsState.results)
        .sort((a, b) => (b.startTimestamp ?? 0) - (a.startTimestamp ?? 0))
        .filter((res) => res.fail || res.success),
    [resultsState.results]
  );

  const currentResult = appState.currentGameId
    ? resultsState.results[appState.currentGameId]
    : undefined;
  const showNewGameButton =
    !currentResult || currentResult.fail || currentResult.success;

  return (
    <div className="h-full flex flex-col gap-2 items-center">
      <div className="w-full flex flex-row gap-2 items-center">
        <span>Games : {resultsArray.length}</span>
        <div className="ml-auto"></div>
        <div>{showNewGameButton && <NewGameButton />}</div>
      </div>
      <CurrentGameResult />
      <div className="flex-1 overflow-y-auto w-full px-1">
        <div className="flex flex-col gap-2 items-start">
          {resultsArray.map((result) => (
            <GameResult key={result.gameId} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};
