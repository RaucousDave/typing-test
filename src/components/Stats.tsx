import { useState } from "react";
import { useGame } from "../hooks/useGame";
import type { GameDiff, GameMode } from "../context/GameContext";

export default function Stats() {
  const {
    time,
    setGameMode,
    setGameStatus,
    gameMode,
    wpm,
    accuracy,
    gameDiff,
    setGameDiff,
    setResults,
  } = useGame();

  const statistics = [
    { text: "WPM", value: wpm },
    { text: "Accuracy", value: `${accuracy}%` },
    { text: "Time", value: time },
  ];
  const difficulty = ["Easy", "Medium", "Hard"];
  const modes = ["Timed(60s)", "Passage"];

  const [activeDifficulty, setActiveDifficulty] = useState<GameDiff>(gameDiff);
  const [activeMode, setActiveMode] = useState<GameMode>(gameMode);
  const handleDiffChange = (diff: GameDiff) => {
    setActiveDifficulty(diff);
    setGameDiff(diff);
    setResults([]);
    setGameStatus("idle");
  };
  const handleModeChange = (mod: GameMode) => {
    setActiveMode(mod);
    setGameMode(mod);
    setGameStatus("idle");
    setResults([]);
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-5 text-xl">
        {statistics.map((statistic, i) => (
          <p key={i} className="text-neutral-500 s">
            {statistic.text}:
            <span className="text-neutral-50 font-semibold ml-4">
              {statistic.value}
            </span>
          </p>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <p className="text-xl text-neutral-500">Difficulty:</p>
        {difficulty.map((diff: GameDiff, i) => {
          const isActive = activeDifficulty === diff.toLowerCase();
          return (
            <button
              key={i}
              onClick={() => {
                handleDiffChange(diff.toLowerCase() as GameDiff);
              }}
              className={`border px-3 cursor-pointer py-1 rounded-lg ${
                isActive
                  ? "border border-blue-400 text-blue-400"
                  : "border text-white border-neutral-500"
              }`}
            >
              {diff}
            </button>
          );
        })}
        <p className="text-neutral-800 text-3xl">|</p>
        <p className="text-xl text-neutral-500">Mode:</p>
        {modes.map((mode: GameMode, i) => {
          const isActive = activeMode === mode;
          return (
            <button
              key={i}
              onClick={() => {
                handleModeChange(mode);
              }}
              className={`border px-3 cursor-pointer py-1 rounded-lg ${
                isActive
                  ? "border border-blue-400 text-blue-400"
                  : "border text-white border-neutral-500"
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
