import { useEffect, useRef, useState } from "react";
import wordLibrary from "../assets/data.json";
import type { GameDiff, GameStatus } from "../context/GameContext";
import { useGame } from "./useGame";

/* 
Look inside data.json, determine the game difficulty, then check for the array that is under that difficulty and then fetch {difficulty}-{randomNumber}
*/

export function useWordEngine(diff: GameDiff, status: GameStatus) {
  const { data, setData, setCurrentIndex, setResults } = useGame();

  const currentIndexRef = useRef(0);

  useEffect(() => {
    const loadPassage = () => {
      const passages = wordLibrary[diff];

      const randomNumber = Math.floor(Math.random() * passages.length);
      const selectedPassage = passages[randomNumber];

      setData(selectedPassage.text);
    };
    loadPassage();
    return;
  }, [diff]);

  useEffect(() => {
    if (status !== "running") return;

    const handleKeyInput = (e: KeyboardEvent) => {
      const keyValue = e.key;
      const wordArray = data.split("");
      const focusCharacter = wordArray[currentIndexRef.current];

      if (keyValue === focusCharacter) {
        setResults
      }
      setCurrentIndex((prev) => prev + 1);
      currentIndexRef.current += 1;
    };
    window.addEventListener("keydown", handleKeyInput);

    return () => {
      window.removeEventListener("keydown", handleKeyInput);
    };
  }, [status, data, setCorrect, setIncorrect]);

  return { data };
}
