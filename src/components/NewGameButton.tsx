import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "../store";
import { startNewGame } from "../actions";

export const NewGameButton = () => {
  const dispatch = useAppDispatch();

  const onNewGameClick = () => {
    dispatch(startNewGame());
  };

  return (
    <Button onClick={onNewGameClick} color="success">
      New game
    </Button>
  );
};
