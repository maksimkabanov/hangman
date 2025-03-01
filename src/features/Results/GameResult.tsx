import React from "react";
import { Result } from "../../types";
import clsx from "clsx";
import moment from "moment";

export const GameResult = ({
  result,
  isCurrent,
}: {
  result: Result;
  isCurrent?: boolean;
}) => {
  const gameIsDone = result.success || result.fail;
  const correctLetters = result.lettersUsed.filter((l) =>
    result.word.includes(l)
  );

  return (
    <div
      className={clsx(
        "box-border flex flex-col gap-2 w-full max-w-[280px] p-3 rounded-md transition-all border text-sm",
        "cursor-pointer shadow-md",
        result.success && "bg-green-100 border-green-400 text-black",
        result.fail && "bg-red-100 border-red-400 text-black",
        !gameIsDone && "bg-gray-900 border-gray-700 text-white",
        isCurrent && "border-2 border-blue-500"
      )}
    >
      <div className="font-semibold">{result.question}</div>

      {gameIsDone && (
        <div className="p-1 bg-gray-800 rounded text-white text-xs">
          ✅ Answer: <span className="font-bold">{result.word}</span>
        </div>
      )}

      <div className="text-xs opacity-80">
        ✅ {correctLetters.length} | ❌{" "}
        {result.lettersUsed.length - correctLetters.length}
      </div>

      {result.endTimestamp && (
        <div className="text-xs opacity-60">
          ⏳{" "}
          {moment
            .utc(result.endTimestamp - result.startTimestamp)
            .format("HH:mm:ss")}
        </div>
      )}
    </div>
  );
};
