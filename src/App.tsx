import React from "react";
import "./App.css";
import { Game } from "./features/Game/Game";
import { Results } from "./features/Results/Results";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="border-bottom w-full text-center p-2">
        Hello in Hangman by Maksim!
      </div>
      <div className="flex flex-row flex-1 w-full p-2">
        <Game />
        <div className="border-left min-w-[400px] p-2">
          <Results />
        </div>
      </div>
    </div>
  );
}

export default App;
