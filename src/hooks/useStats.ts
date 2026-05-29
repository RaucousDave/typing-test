import { useGame } from "./useGame";
import { useEffect, useRef } from "react";

export function useStats() {
  const { setAccuracy, results, setWpm } = useGame();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (results.length === 0) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      return;
    }

    const correctChars = results.filter((res) => res === "correct").length;
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // in minutes

    setWpm(timeElapsed > 0 ? Math.floor(correctChars / 5 / timeElapsed) : 0);
  }, [results, setWpm]);

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
