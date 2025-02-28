import React from "react";
import { Button } from "@mui/material";

interface StyledButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
}

export const LetterButton: React.FC<StyledButtonProps> = ({
  children,
  disabled = false,
  backgroundColor = "white",
  onClick,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        fontWeight: 700,
        minWidth: "40px", // Prevents button from stretching
        width: "40px", // Ensures uniform size
        height: "40px", // Makes it square
        padding: 0, // Removes extra padding
        textAlign: "center", // Centers text
        "&.Mui-disabled": {
          backgroundColor: backgroundColor,
          color: "black",
        },
      }}
    >
      {children}
    </Button>
  );
};
