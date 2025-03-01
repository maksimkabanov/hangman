import React from "react";
import { useAppSelector } from "../../store";
import { LettersBoard } from "./LettersBoard";
import { GameWord } from "./GameWord";
import { NewGameButton } from "../../components/NewGameButton";
import clsx from "clsx";
import { GameImg } from "./GameImg";
import { gameSelector } from "../../selectors";

const getLifesColor = (lifes: number) => {
  switch (lifes) {
    case 5:
      return "text-green-400 shadow-green-400 drop-shadow-md";
    case 4:
      return "text-lime-400 shadow-lime-400 drop-shadow-md";
    case 3:
      return "text-yellow-400 shadow-yellow-400 drop-shadow-md";
    case 2:
      return "text-orange-400 shadow-orange-400 drop-shadow-md";
    case 1:
      return "text-red-400 shadow-red-400 drop-shadow-md";
    case 0:
      return "text-black shadow-black drop-shadow-md";
    default:
      return "text-black shadow-black drop-shadow-md";
  }
};

export const Game = () => {
  const gameState = useAppSelector(gameSelector);

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {!!gameState.gameId && (
        <div className="flex flex-col items-center gap-2 p-2">
          <h2 className="w-full text-center text-2xl text-blue-500">
            {gameState.question}
          </h2>
          <GameWord />
          <LettersBoard />
        </div>
      )}
      <div className="relative flex flex-1 w-full overflow-hidden items-center justify-center">
        <div className="relative max-w-full max-h-full aspect-square">
          {gameState.gameId && (
            <div
              className={clsx(
                "absolute top-[10%] right-0 text-4xl",
                getLifesColor(gameState.lifes)
              )}
            >
              {gameState.lifes}
            </div>
          )}

          <GameImg />
          {!gameState.gameId && (
            <div className="absolute top-[13%] right-[5%]">
              <NewGameButton />
            </div>
          )}
          {(gameState.success || gameState.fail) && (
            <div className="absolute top-[13%] left-0">
              <NewGameButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
