import React, { Fragment, ReactElement } from "react";
import { RootState, useAppSelector } from "../../store";
import { LettersBoard } from "./LettersBoard";
import { GameWord } from "./GameWord";
import { NewGameButton } from "../../components/NewGameButton";
import clsx from "clsx";

enum gamePictures {
  new = "images/anime-pers.png",
  liles5 = "images/stages/5.png",
  liles4 = "images/stages/4.png",
  liles3 = "images/stages/3.png",
  liles2 = "images/stages/2.png",
  liles1 = "images/stages/1.png",
  liles0 = "images/stages/0.png",
}

const lifesToImage = (lifes: number | undefined) => {
  switch (lifes) {
    case 5:
      return gamePictures.liles5;
    case 4:
      return gamePictures.liles4;
    case 3:
      return gamePictures.liles3;
    case 2:
      return gamePictures.liles2;
    case 1:
      return gamePictures.liles1;
    case 0:
      return gamePictures.liles0;
    default:
      return gamePictures.new;
  }
};

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

export const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useAppSelector(gameSelector);

  const getHost = (childs?: ReactElement[] | ReactElement | undefined) => (
    <div className="relative w-full h-full flex flex-col items-center">
      {childs}
      <div className="relative flex flex-1 w-full overflow-hidden items-center justify-center">
        <div className="relative max-w-full max-h-full aspect-square">
          {!gameState.gameId && (
            <div className="absolute top-[13%] right-[5%]">
              <NewGameButton />
            </div>
          )}
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
          <img
            className="max-w-full max-h-full"
            src={lifesToImage(gameState.gameId ? gameState.lifes : undefined)}
            alt="Max's hangman character"
          />
        </div>
      </div>
    </div>
  );

  if (!gameState.gameId) return getHost();

  return getHost(
    <div className="flex flex-col items-center gap-2 p-2">
      <h2 className="w-full text-center text-2xl text-blue-500">
        {gameState.question}
      </h2>
      <GameWord />
      <LettersBoard />
      <div className="relative w-full flex flex-row p-1">
        <div className="absolute bottom-[-20] left-20">
          {(gameState.success || gameState.fail) && <NewGameButton />}
        </div>
      </div>
    </div>
  );
};
