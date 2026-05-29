import { useEffect, useRef } from "react";
import wordLibrary from "../assets/data.json";
import type { GameDiff, GameStatus } from "../context/GameContext";
import { useGame } from "./useGame";
import toast from "react-hot-toast";

interface Passage {
  text: string;
}

export function useWordEngine(diff: GameDiff, status: GameStatus) {
  const { data, setData, setCurrentIndex, setGameStatus, setResults } =
    useGame();

  const currentIndexRef = useRef(0);
  const incorrectIndexRef = useRef(0);
  const maxErrors = 30;

  useEffect(() => {
    const loadPassage = () => {
      const passages: Passage[] = wordLibrary[diff];

      if (!passages) throw new Error(`Something went wrong: , [${diff}]`);
      const randomNumber = Math.floor(Math.random() * passages.length);
      const selectedPassage = passages[randomNumber];

      setData(selectedPassage.text);

      currentIndexRef.current = 0;
      setCurrentIndex(0);
      setResults([]);
    };
    loadPassage();
    return;
  }, [diff, setData, setCurrentIndex, setResults]);

  useEffect(() => {
    if (status !== "running") return;

    const handleKeyInput = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setResults((prev) => [...prev.slice(0, -1)]);
        currentIndexRef.current -= 1;
        incorrectIndexRef.current -= 1;
        setCurrentIndex((prev) => prev - 1);
        return;
      }
      if (e.key.length > 1) return;
      const keyValue = e.key;
      const wordArray = data.split("");
      const focusCharacter = wordArray[currentIndexRef.current];

      console.log("Focus character: ", focusCharacter);
      console.log("Key pressed: ", keyValue);

      setResults((prev) => [
        ...prev,
        focusCharacter === keyValue ? "correct" : "incorrect",
      ]);

      if (keyValue !== focusCharacter) {
        incorrectIndexRef.current += 1;
        if (incorrectIndexRef.current >= maxErrors) {
          setGameStatus("finished");
          toast.error("Test invalid-accuracy");
        }
      }
      if (currentIndexRef.current >= wordArray.length - 1) {
        setGameStatus("finished");
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      currentIndexRef.current += 1;
    };
    window.addEventListener("keydown", handleKeyInput);

    return () => {
      window.removeEventListener("keydown", handleKeyInput);
    };
  }, [status, data, setCurrentIndex, setGameStatus, setResults]);

  return { data, currentIndexRef, incorrectIndexRef };
}
