import React, { useMemo } from "react";
import { GameResult } from "./GameResult";
import { resultsSelector } from "./Results.slice";
import { useAppSelector } from "../../store";
import { CurrentGameResult } from "./CurrentGameResult";

export const Results = () => {
  const resultsState = useAppSelector(resultsSelector);

  const resultsArray = useMemo(
    () =>
      Object.values(resultsState.results).filter(
        (res) => res.fail || res.success
      ),
    [resultsState.results]
  );

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="text-center border-bottom">
        Tottal games: {resultsArray.length}
      </div>
      <CurrentGameResult />
      {resultsArray.map((result) => (
        <GameResult key={result.gameId} result={result} />
      ))}
    </div>
  );
};
