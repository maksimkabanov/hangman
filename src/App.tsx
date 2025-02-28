import React, { useState } from "react";
import "./App.css";
import { Game } from "./features/Game/Game";
import { Results } from "./features/Results/Results";
import { useAppDispatch } from "./store";
import { resetAll, restoreResultesFromStorage } from "./actions";
import { Button } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  React.useEffect(() => {
    dispatch(restoreResultesFromStorage());
  }, [dispatch]);

  const onResetAllClick = () => {
    dispatch(resetAll());
  };

  return (
    <div className="flex flex-col items-center h-[100dvh] w-full">
      {/* Header */}
      <div className="text-gray-300 border-bottom w-full text-center p-2">
        Hello in Hangman by Maksim!
      </div>

      {/* Main layout (game + stats) */}
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Game area */}
        <div className="flex flex-col flex-1 min-w-[400px] p-2 h-full max-h-[100dvh] overflow-y-auto">
          <div className="flex-1">
            <Game />
          </div>

          {/* Bottom buttons (always visible) */}
          <div className="flex flex-row sticky bottom-0 bg-white p-2 border-t">
            <div className="ml-auto"></div>
            <Button onClick={onResetAllClick}>Reset all</Button>
            <Button className="lg:hidden" onClick={() => setShowSidebar(true)}>
              Stats
            </Button>
          </div>
        </div>

        {/* Stats (visible on large screens) */}
        <div className="hidden lg:flex border-left p-2 min-w-[400px] h-full max-h-[100dvh] overflow-y-auto justify-center">
          <Results />
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] bg-gray-900 text-white shadow-lg transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto`}
        style={{ width: "min(75vw, 400px)" }}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg font-semibold">Statistics</span>
            <Button onClick={() => setShowSidebar(false)}>Close</Button>
          </div>
          <div className="flex-1 overflow-auto p-2 justify-center">
            <Results />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
