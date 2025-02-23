import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LettersBoard } from "./LettersBoard/LettersBoard";

export const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useSelector(gameSelector);

  const getHost = (childs: ReactElement[] | ReactElement) => (
    <div className="w-full h-full flex flex-col items-center">{childs}</div>
  );

  if (!gameState.gameId)
    return getHost(<span>No current game. Start a new one!</span>);

  return (
    <div className="w-full h-full flex flex-col">
      <div>{gameState.question}</div>
      <LettersBoard />
    </div>
  );
};
