import React from "react";
import { motion } from "framer-motion";

type LetterButtonProps = {
  children: React.ReactNode;
  success: boolean;
  fail: boolean;
  hidden: boolean;
  gameOver: boolean;
  onClick?: () => void;
};

export const LetterButton: React.FC<LetterButtonProps> = ({
  children,
  success,
  fail,
  hidden,
  gameOver,
  onClick,
}) => {
  const buttonStyles = `
    relative w-10 h-10 sm:w-14 sm:h-14 text-lg sm:text-2xl font-extrabold flex items-center justify-center 
    rounded-lg shadow-lg transition-all border-2 
    ${success ? "bg-green-600 text-white border-green-400" : ""}
    ${fail ? "bg-red-600 text-white border-red-400" : ""}
    ${
      hidden
        ? "bg-gradient-to-br from-blue-300 to-blue-700 text-white border-blue-500"
        : ""
    }
    ${
      !success && !fail && !hidden && !gameOver
        ? "bg-black text-white border-gray-500"
        : ""
    }
    ${
      !success && !fail && !hidden && gameOver
        ? "bg-gray-500 text-white border-gray-300 cursor-not-allowed"
        : ""
    }
  `;

  return (
    <motion.button
      className={buttonStyles}
      whileHover={
        !gameOver && !hidden
          ? { scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)" }
          : {}
      }
      whileTap={!gameOver && !hidden ? { scale: 0.95 } : {}}
      onClick={!gameOver && !hidden ? onClick : undefined}
      disabled={gameOver}
    >
      {children}
    </motion.button>
  );
};

export default LetterButton;
