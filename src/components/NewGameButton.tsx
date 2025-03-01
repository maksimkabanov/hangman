import React from "react";
import { useAppDispatch } from "../store";
import { startNewGame } from "../actions";

export const NewGameButton = () => {
  const dispatch = useAppDispatch();

  const onNewGameClick = () => {
    dispatch(startNewGame());
  };

  return (
    <button
      onClick={onNewGameClick}
      className="flex items-center gap-2 px-2 py-1 bg-white text-green-800 
                 rounded-lg shadow-md transition-all 
                 hover:shadow-lg active:scale-95"
    >
      <img
        src="images/anime-pers.png"
        alt="new game"
        className="w-[20px] ratio-square"
      ></img>
      <span className="font-medium">New Game</span>
    </button>
  );
};
