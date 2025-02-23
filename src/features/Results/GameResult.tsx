import React from "react";
import { Result } from "../../types";

export const GameResult = ({ result }: { result: Result }) => {
  return (
    <div className="flex flex-col">
      <div>{JSON.stringify(result)}</div>
    </div>
  );
};
