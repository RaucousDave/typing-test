import { useGame } from "../hooks/useGame";
import { useStats } from "../hooks/useStats";
import { useWordEngine } from "../hooks/useWordEngine";
import { RotateCcw } from "lucide-react";

const stateClass = {
  correct: "text-green-500",
  incorrect: "text-red-500 underline decoration-red-500",
  pending: "text-neutral-500",
  cursor: "text-white bg-neutral-500",
};

export default function Body() {
  const {
    gameDiff,
    gameStatus,
    results,
    setCurrentIndex,
    setGameStatus,
    setResults,
  } = useGame();
  const { data, currentIndexRef, incorrectIndexRef } = useWordEngine(
    gameDiff,
    gameStatus,
  );
  useStats();
  return (
    <>
      {data.split("").map((char, i) => {
        const state =
          i < results.length
            ? results[i]
            : i === results.length
              ? "cursor"
              : "pending";

        return (
          <span
            key={i}
            className={`text-4xl leading-14 ${stateClass[state]} ${gameStatus === "idle" ? "blur-sm" : ""}`}
          >
            {char}
          </span>
        );
      })}
      {gameStatus === "idle" && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              setGameStatus("running");
            }}
            className="bg-blue-600 cursor-pointer absolute top-100 text-neutral-50 px-6 text-lg py-3 rounded-lg outline-blue-400"
          >
            Start Typing Test
          </button>
        </div>
      )}

      <div className="h-0.5 w-full mt-8 bg-neutral-400/60"></div>
      {gameStatus === "running" && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setResults([]);
              currentIndexRef.current = 0;
              incorrectIndexRef.current = 0;
              setCurrentIndex(0);
              setGameStatus("idle");
            }}
            className="bg-neutral-800 flex gap-3 px-4 py-3 text-xl rounded-xl hover:bg-neutral-500 transition-all duration-150 ease-in cursor-pointer text-white"
          >
            Restart Test
            <RotateCcw />
          </button>
        </div>
      )}
    </>
  );
}
