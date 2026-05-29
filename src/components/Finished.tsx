import { useGame } from "../hooks/useGame";
import { RotateCw } from "lucide-react";
import { useStats } from "../hooks/useStats";

export default function Finished() {
  const { results, wpm, accuracy, setGameStatus, isFirstTime } = useGame();
  useStats();

  const correct = results.filter((result) => result === "correct").length;
  const incorrect = results.length - correct;
  const finishedStats = [
    { text: "WPM", value: wpm, style: "text-white" },
    { text: "Accuracy", value: `${accuracy}%`, style: "text-red-500" },
    {
      text: "Characters",
      render: (
        <>
          <span className="text-green-500">{correct}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-red-500">{incorrect}</span>
        </>
      ),
    },
  ];
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

      <div className="grid grid-cols-3 gap-4">
        {finishedStats.map((finishedStat, i) => (
          <div
            key={i}
            className="text-left px-5 border-2 border-neutral-800 py-1 rounded-lg space-y-2"
          >
            <h1 className="text-neutral-500 text-lg">{finishedStat.text}</h1>
            <p className={`font-semibold text-2xl ${finishedStat.style ?? ""}`}>
              {finishedStat.value ?? finishedStat.render}
            </p>
          </div>
        ))}
      </div>
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
