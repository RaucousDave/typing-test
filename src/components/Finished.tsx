import { useGame } from "../hooks/useGame";
import { RotateCw } from "lucide-react";
import { useStats } from "../hooks/useStats";

export default function Finished() {
  const { results, wpm, accuracy, setGameStatus, isFirstTime } = useGame();
  useStats();

  const correct = results.filter((result) => result === "correct").length;
  const incorrect = results.length - correct;

  return (
    <div className="flex flex-col relative justify-center  overflow-hidden gap-5 items-center">
      <img
        src="/assets/pattern-star-1.svg"
        className="absolute right-4"
        alt=""
      />
      <img
        src="/assets/pattern-star-2.svg"
        className="absolute left-4 top-4"
        alt=""
      />
      <div className="border-4 p-2 rounded-full border-green-500/5 flex items-center justify-center bg-green-500/20">
        <img src="/assets/icon-completed.svg" alt="" />
      </div>

      <h1 className="text-neutral-50 text-4xl font-semibold">
        {isFirstTime ? "Baseline Established" : "Test Complete"}
      </h1>
      <p className="text-neutral-400 text-lg">
        {isFirstTime
          ? "You've set the bar. Now the real challenge begins-time to beat it"
          : "Solid run. Keep pushing to beat your high score"}
      </p>

      <div className="grid grid-cols-3 gap-4"></div>
      <button
        onClick={() => {
          setGameStatus("idle");
        }}
        className="bg-neutral-50 flex gap-3 text-lg px-5 mt-7 hover:bg-neutral-200 transition ease-linear duration-300 cursor-pointer py-3 rounded-lg font-semibold"
      >
        Go again
        <RotateCw />
      </button>
    </div>
  );
}
