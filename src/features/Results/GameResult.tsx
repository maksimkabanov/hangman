import React from "react";
import { Result } from "../../types";
import clsx from "clsx";
import moment from "moment";

export const GameResult = ({ result }: { result: Result }) => {
  const gameIsDone = result.success || result.fail;
  const correctLetters = result.lettersUsed.filter(
    (l) => result.word.indexOf(l) > -1
  );

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 w-[300px] p-2 border border-gray-200",
        result.success && "bg-green-100",
        result.fail && "bg-red-100",
        result.success || result.fail ? "text-black" : "text-white"
      )}
    >
      <div className="text-center italic">{result.question}</div>
      {gameIsDone && <div className="text-center italic">({result.word})</div>}
      <div>
        Correct: {correctLetters.length} / Wrong:{" "}
        {result.lettersUsed.length - correctLetters.length}
      </div>
      {result.endTimestamp && (
        <div>
          Time:{" "}
          {moment
            .utc(result.endTimestamp - result.startTimestamp)
            .format("HH:mm:ss")}
        </div>
      )}
    </div>
  );
};
