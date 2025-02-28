import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { gameSelector } from "./Game";
import { Button } from "@mui/material";
import {
  FAIL_COLOR,
  GRAY_COLOR,
  LETTERS_ARRAY,
  SUCCESS_COLOR,
} from "../../constants";
import { guessLetter } from "../../actions";
import { LetterButton } from "../../components/LetterButton";

export const LettersBoard = () => {
  const dispatch = useAppDispatch();

  const gameState = useAppSelector(gameSelector);

  const onGuessLetterClick = (letter: string) => {
    dispatch(guessLetter(letter));
  };

  const isLetterUsed = (letter: string) =>
    gameState.lettersUsed.indexOf(letter) > -1;
  const isLetterCorrect = (letter: string) =>
    gameState.word.indexOf(letter) > -1;

  const gameIsDone = gameState.success || gameState.fail;

  return (
    <div className="flex flex-row gap-2 p-4 flex-wrap justify-center">
      {LETTERS_ARRAY.map((letter) => {
        const letterUsed = isLetterUsed(letter);
        const letterCorrect = letterUsed && isLetterCorrect(letter);
        const letterDisabledColor = letterUsed
          ? letterCorrect
            ? SUCCESS_COLOR
            : FAIL_COLOR
          : GRAY_COLOR;
        return (
          <LetterButton
            key={letter}
            disabled={gameIsDone || letterUsed}
            onClick={() => onGuessLetterClick(letter)}
            backgroundColor={letterDisabledColor}
          >
            {letter.toUpperCase()}
          </LetterButton>
        );
      })}
    </div>
  );
};
