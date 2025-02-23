import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LettersBoard } from "./LettersBoard/LettersBoard";

const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useSelector(gameSelector);

  return (
    <div className="w-full h-full flex flex-col">
      <div>{gameState.question}</div>
      <LettersBoard />
    </div>
  );
};
