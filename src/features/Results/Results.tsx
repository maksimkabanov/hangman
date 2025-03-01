import React, { useMemo } from "react";
import { GameResult } from "./GameResult";
import { resultsSelector } from "./Results.slice";
import { useAppSelector } from "../../store";
import { CurrentGameResult } from "./CurrentGameResult";

export const Results = () => {
  const resultsState = useAppSelector(resultsSelector);

  const resultsArray = useMemo(
    () =>
      Object.values(resultsState.results)
        .sort((a, b) => (b.startTimestamp ?? 0) - (a.startTimestamp ?? 0))
        .filter((res) => res.fail || res.success),
    [resultsState.results]
  );

  return (
    <div className="h-full flex flex-col gap-2 items-center pb-4">
      <div className="text-center border-b pb-2">
        Games finished: {resultsArray.length}
      </div>
      <CurrentGameResult />
      <div className="flex-1 overflow-y-auto w-full px-1">
        <div className="flex flex-col gap-2 items-start pb-10">
          {resultsArray.map((result) => (
            <GameResult key={result.gameId} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};
