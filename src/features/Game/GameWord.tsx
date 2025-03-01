import React from "react";
import { useAppSelector } from "../../store";
import { gameSelector } from "./Game";
import clsx from "clsx";
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
        return (
          <LetterButton
            key={index}
            success={letterUsed}
            fail={gameIsDone && !letterUsed}
            hidden={!letterUsed && !gameIsDone}
            gameOver={gameIsDone}
          >
            {gameIsDone || letterUsed ? letter.toUpperCase() : "_"}
          </LetterButton>
        );
      })}
    </div>
  );
};
