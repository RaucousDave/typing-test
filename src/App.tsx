import Header from "./components/Header";
import Stats from "./components/Stats";
import Body from "./components/Body";
import Finished from "./components/Finished";
import { Toaster } from "react-hot-toast";

import { useGame } from "./hooks/useGame";
import { useTimer } from "./hooks/useTimer";

export default function App() {
  const { gameStatus, gameMode } = useGame();

  useTimer(gameMode, gameStatus);

  console.log("Game status: ", gameStatus);
  return (
    <div className="bg-neutral-900 relative px-20 space-y-5 min-h-screen p-10">
      <Header />

      {gameStatus !== "finished" && (
        <>
          <Stats />
          <div className="h-0.5 w-full mb-12 bg-neutral-400/60"></div>
          <Body />
          <Toaster />
        </>
      )}
      {gameStatus === "finished" && <Finished />}
    </div>
  );
}
