import React, { Fragment, ReactElement } from "react";
import { RootState, useAppSelector } from "../../store";
import { LettersBoard } from "./LettersBoard";
import { GameWord } from "./GameWord";
import { NewGameButton } from "../../components/NewGameButton";

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
  console.log("lifes", lifes);
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

export const gameSelector = (state: RootState) => state.game;

export const Game = () => {
  const gameState = useAppSelector(gameSelector);

  const getHost = (childs: ReactElement[] | ReactElement) => (
    <div className="w-full h-full flex flex-col items-center gap-2">
      {childs}
      <div className="flex flex-1 w-full items-center justify-center overflow-hidden">
        <img
          className="max-w-full max-h-full w-auto h-auto object-contain"
          src={lifesToImage(gameState.lifes)}
          alt="Max's hangman character"
        />
      </div>
    </div>
  );

  if (!gameState.gameId) return getHost(<NewGameButton />);

  return getHost(
    <Fragment>
      <h2 className="w-full text-center text-2xl text-blue-500">
        {gameState.question}
      </h2>
      <GameWord />
      <LettersBoard />
      <div className="w-full flex flex-row p-1">
        {(gameState.success || gameState.fail) && <NewGameButton />}
        <div className="ml-auto"></div>
        <span>Lifes left: {gameState.lifes}</span>
      </div>
    </Fragment>
  );
};
