import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const resultsSelector = (state: RootState) => state.results;

export const Results = () => {
  const resultsState = useSelector(resultsSelector);

  return (
    <div className="h-full flex flex-col">
      <div>Tottal games: {resultsState.results.length}</div>
    </div>
  );
};
