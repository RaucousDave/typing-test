import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

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
export type GameDiff = "easy" | "medium" | "hard";

type GameState = {
  characters: string[];
  error: string;
  data: string;
  time: number;
  beatHighScore: boolean;
  gameMode: GameMode;
  gameDiff: GameDiff;
  typingTime: number;
  errorRef: RefObject<string>;
  accuracy: number;
  currentIndex: number;
  isFirstTime: boolean;
  gameStatus: GameStatus;
  wpm: number;
  results: GameResults[];
};

type GameActions = {
  setData: React.Dispatch<React.SetStateAction<string>>;
  setCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setBeatHighScore: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [gameDiff, setGameDiff] = useState<GameDiff>("easy");
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [error, setError] = useState("");

  const [beatHighScore, setBeatHighScore] = useState(false);

  const [data, setData] = useState("");
  const errorRef = useRef<string | null>(null);

  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");

  const isFirstTime = !localStorage.getItem("first_time");
  if (isFirstTime) {
    localStorage.setItem("first_time", "true");
  }

  useEffect(() => {
    if (!localStorage.getItem("high_score")) {
      localStorage.setItem("high_score", "0");
    }
  }, []);

  useEffect(() => {
    const calculateHighScore = () => {
      if (gameStatus !== "finished") {
        return;
      }
      const storedHighScore = parseInt(localStorage.getItem("high_score"));

      if (wpm > storedHighScore) {
        setBeatHighScore(true);
      }
    };
    calculateHighScore();
  }, [gameStatus, wpm]);

  return (
    <GameContext.Provider
      value={{
        characters,
        currentIndex,
        errorRef,
        setCurrentIndex,
        setCharacters,
        beatHighScore,
        setBeatHighScore,
        data,
        error,
        setError,
        setData,
        isFirstTime,
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
