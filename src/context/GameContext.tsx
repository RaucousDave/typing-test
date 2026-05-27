import React, { createContext, useState } from "react";

/* 
Things to consider when building a typing game: 
 - WPM
 - Accuracy
 - Correct characters
 - Incorrect characters
 -  Game state - (running, idle, finished)
 - Time taken for exercise
 - Game mode - (Timed(60s), Passage)
 - Game difficulty - (Easy, Medium, Hard)
*/

export type GameMode = "Timed(60s)" | "Passage";
export type GameStatus = "idle" | "running" | "finished";
export type GameResults = "correct" | "incorrect";
export type GameDiff = "Easy" | "Medium" | "Hard";

type GameState = {
  characters: string[];
  currentIndex: number;
  data: string;
  time: number;
  gameMode: GameMode;
  gameDiff: GameDiff;
  typingTime: number;
  accuracy: number;
  gameStatus: GameStatus;
  wpm: number;
  results: GameResults[];
};

type GameActions = {
  setData: React.Dispatch<React.SetStateAction<string>>;
  setCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  setGameDiff: React.Dispatch<React.SetStateAction<GameDiff>>;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  setTypingTime: React.Dispatch<React.SetStateAction<number>>;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  setResults: React.Dispatch<React.SetStateAction<GameResults[]>>;
};
type GameContextType = GameState & GameActions;

export const GameContext = createContext<GameContextType | null>(null);

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState<GameResults[]>([]);
  const [time, setTime] = useState(0);
  const [typingTime, setTypingTime] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>("Timed(60s)");
  const [gameDiff, setGameDiff] = useState<GameDiff>("Easy");
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [data, setData] = useState("");

  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");

  return (
    <GameContext.Provider
      value={{
        characters,
        currentIndex,
        setCurrentIndex,
        setCharacters,
        data,
        setData,
        typingTime,
        setTypingTime,
        gameStatus,
        setGameStatus,
        time,
        setTime,
        gameMode,
        setGameDiff,
        gameDiff,
        setGameMode,
        accuracy,
        setAccuracy,
        wpm,
        setWpm,
        results,
        setResults,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
