import React, { useState } from "react";
import "./App.css";
import { Game } from "./features/Game/Game";
import { Results } from "./features/Results/Results";
import { useAppDispatch } from "./store";
import { resetAll, restoreResultesFromStorage } from "./actions";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function App() {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  React.useEffect(() => {
    dispatch(restoreResultesFromStorage());
    // Prevent body scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch]);

  const onResetAllClick = () => {
    dispatch(resetAll());
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center w-full min-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center text-gray-300 border-b w-full">
        <IconButton onClick={onResetAllClick} color="inherit">
          <RestartAltIcon />
        </IconButton>
        <span className="mx-auto text-center flex-1">
          Hello in Hangman by Maksim!
        </span>
        <div className="ml-auto"></div>
        {/* Burger menu (visible only on small screens) */}
        <div className="hidden max-md:flex">
          <IconButton onClick={() => setShowSidebar(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Main layout (game + stats) */}
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Game area */}
        <div className="flex flex-col flex-1 min-w-[400px] p-2 overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-4">
            <Game />
          </div>
          <div className="absolute bottom-2 left-2 text-gray-200 text-sm">
            Version: 0.1.11
          </div>
        </div>

        {/* Stats (visible on large screens) */}
        <div className="hidden md:flex border-l p-2 min-w-[300px] h-full justify-center bg-gray-900 text-white">
          <Results />
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-md transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto flex justify-center`}
        style={{ minWidth: "min(75vw, 300px)" }}
      >
        <div className="p-4 flex flex-col h-full w-full">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg font-semibold">Statistics</span>
            <Button onClick={() => setShowSidebar(false)}>Close</Button>
          </div>
          <div className="flex-1 overflow-y-auto flex justify-center pb-4">
            <Results />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
