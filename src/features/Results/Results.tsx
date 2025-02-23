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
    <div className="h-full flex flex-col gap-2 items-center">
      <div className="text-center border-bottom">
        Games finished: {resultsArray.length}
      </div>
      <CurrentGameResult />
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-2 h-full overflow-auto">
          {resultsArray.map((result) => (
            <GameResult key={result.gameId} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};
