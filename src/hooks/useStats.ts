import { useGame } from "./useGame";
import { useEffect, useRef } from "react";

export function useStats() {
  const { setAccuracy, results} = useGame();

//   const startTimeRef = useRef<number | null>(null);

//   startTimeRef.current = Date.now();

//   const elapsedTimeSeconds = (Date.now() - startTimeRef.current) / 1000;

  const correct = results.filter((result) => result === "correct").length;

  const playerAccuracy = Math.floor((correct / results.length) * 100);
  useEffect(() => {
    if (results.length !== 0) {
      setAccuracy(playerAccuracy);
    } else {
      setAccuracy(0);
    }
  }, [playerAccuracy, results.length, setAccuracy]);
}
