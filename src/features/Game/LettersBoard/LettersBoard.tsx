import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { gameSlice } from "../Game.slice";
import { gameSelector } from "../Game";
import { Button } from "@mui/material";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_ARRAY = LETTERS.split("");

export const LettersBoard = () => {
  const dispatch = useAppDispatch();

  const gameState = useAppSelector(gameSelector);

  const guessLetter = (letter: string) => {
    dispatch(gameSlice.actions.guessLetter(letter));
  };

  const isLetterUsed = (letter: string) =>
    gameState.lettersUsed.indexOf(letter) > -1;
  const isLetterCorrect = (letter: string) =>
    gameState.word.indexOf(letter) > -1;

  return (
    <div className="flex flex-row gap-2 p-4 flex-wrap justify-center">
      {LETTERS_ARRAY.map((letter) => {
        const letterUsed = isLetterUsed(letter);
        const letterCorrect = letterUsed && isLetterCorrect(letter);
        return (
          <Button
            key={letter}
            className="letter-button"
            onClick={() => guessLetter(letter)}
            disabled={letterUsed}
            sx={{
              "&.Mui-disabled": {
                backgroundColor: letterCorrect ? "green" : "red",
                color: letterCorrect ? "black" : "white",
                fontWeight: 700,
              },
            }}
          >
            {letter.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
};
