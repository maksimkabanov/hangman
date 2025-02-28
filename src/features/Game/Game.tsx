import React, { ReactElement } from "react";
import { RootState, useAppSelector } from "../../store";
import { LettersBoard } from "./LettersBoard";
import { GameWord } from "./GameWord";
import { NewGameButton } from "../../components/NewGameButton";

export const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useAppSelector(gameSelector);

  const getHost = (childs: ReactElement[] | ReactElement) => (
    <div className="w-full h-full flex flex-col items-center">{childs}</div>
  );

  if (!gameState.gameId) return getHost(<NewGameButton />);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h2 className="w-full text-center text-2xl text-blue-500">
        {gameState.question}
      </h2>
      <GameWord />
      <LettersBoard />
      <h2 className="w-full text-right text-green-500">
        Lifes left: {gameState.lifes}
      </h2>
    </div>
  );
};
