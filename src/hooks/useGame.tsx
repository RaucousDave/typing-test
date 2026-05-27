import { GameContext } from "../context/GameContext";
import { useContext } from "react";

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("App scope must be within Game Context Provider");
  }

  return context;
}
