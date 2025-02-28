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
      <div className="w-full flex flex-row p-1">
        {gameState.success || (gameState.fail && <NewGameButton />)}
        <div className="ml-auto"></div>
        <span>Lifes left: {gameState.lifes}</span>
      </div>
    </div>
  );
};
