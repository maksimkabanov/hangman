import React from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_ARRAY = LETTERS.split("");

export const LettersBoard = () => {
  return (
    <div className="flex flex-row gap-2">
      {LETTERS_ARRAY.map((letter) => (
        <div>{letter.toUpperCase()}</div>
      ))}
    </div>
  );
};
