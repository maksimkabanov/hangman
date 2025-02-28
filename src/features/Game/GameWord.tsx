import React from "react";
import { useAppSelector } from "../../store";
import { gameSelector } from "./Game";
import clsx from "clsx";
import { FAIL_COLOR, SUCCESS_COLOR } from "../../constants";
import { LetterButton } from "../../components/LetterButton"; // Import new button

export const GameWord = () => {
  const gameState = useAppSelector(gameSelector);

  const isLetterUsed = (letter: string) =>
    gameState.lettersUsed.indexOf(letter) > -1;

  const gameIsDone = gameState.success || gameState.fail;

  return (
    <div
      className={clsx(
        "flex flex-row gap-2 p-4 flex-wrap justify-center",
        gameState.success && "bg-green-100",
        gameState.fail && "bg-red-100"
      )}
    >
      {gameState.word.map((letter, index) => {
        const letterUsed = isLetterUsed(letter);
        const letterDisabledColor = letterUsed
          ? SUCCESS_COLOR
          : gameIsDone
          ? FAIL_COLOR
          : "white";

        return (
          <LetterButton
            key={index}
            disabled={true}
            backgroundColor={letterDisabledColor}
          >
            {gameIsDone || letterUsed ? letter.toUpperCase() : "_"}
          </LetterButton>
        );
      })}
    </div>
  );
};
