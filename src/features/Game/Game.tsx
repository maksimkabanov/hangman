import React, { ReactElement } from "react";
import { RootState, useAppSelector } from "../../store";
import { LettersBoard } from "./LettersBoard";
import { GameWord } from "./GameWord";

export const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useAppSelector(gameSelector);

  const getHost = (childs: ReactElement[] | ReactElement) => (
    <div className="w-full h-full flex flex-col items-center">{childs}</div>
  );

  if (!gameState.gameId)
    return getHost(<span>No current game. Start a new one!</span>);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h2 className="w-full text-center text-2xl text-blue-500">
        {gameState.question}
      </h2>
      <GameWord />
      <LettersBoard />
    </div>
  );
};
