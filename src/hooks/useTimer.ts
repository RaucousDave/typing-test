import { useEffect, useRef } from "react";
import type { GameMode } from "../context/GameContext";
import type { GameStatus } from "../context/GameContext";
import { useGame } from "./useGame";

/* 
This function should only run when game mode is on timed hence the return
it should count down from 60s and display the time on the component of the game
once it is over it should switch the game status to finished
*/
export function useTimer(mode: GameMode, status: GameStatus) {
  const { time, setTime, setGameStatus } = useGame();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (mode === "Passage" || status !== "running") return;

    setTime(60);
    timerRef.current = setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
          }
          setGameStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [mode, status, setGameStatus, setTime]);

  return { time };
}
