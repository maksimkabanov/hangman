import React, { useEffect } from "react";
import "./App.css";
import { Game } from "./features/Game/Game";
import { Results } from "./features/Results/Results";
import { useAppDispatch } from "./store";
import { restoreResultesFromStorage } from "./actions";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreResultesFromStorage());
  });

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="text-gray-300 border-bottom w-full text-center p-2">
        Hello in Hangman by Maksim!
      </div>
      <div className="flex flex-row flex-1 h-full w-full">
        <div className="flex-1 min-w-[400px] p-2 h-full">
          <Game />
        </div>
        <div className="border-left p-2 min-w-[400px] h-full">
          <Results />
        </div>
      </div>
    </div>
  );
}

export default App;
