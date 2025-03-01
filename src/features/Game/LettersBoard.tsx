import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { LETTERS_ARRAY } from "../../constants";
import { guessLetter } from "../../actions";
import { LetterButton } from "../../components/LetterButton";
import { gameSelector } from "../../selectors";

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
        const letterIsCorrect = isLetterCorrect(letter);
        return (
          <LetterButton
            key={letter}
            success={letterUsed && letterIsCorrect}
            fail={letterUsed && !letterIsCorrect}
            gameOver={gameIsDone}
            hidden={false}
            onClick={() => onGuessLetterClick(letter)}
          >
            {letter.toUpperCase()}
          </LetterButton>
        );
      })}
    </div>
  );
};
