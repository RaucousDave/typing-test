import Header from "./components/Header";
import type { GameStatus } from "./context/GameContext";
import { useGame } from "./hooks/useGame";
import { useWordEngine } from "./hooks/useWordEngine";

export default function App() {
  const { gameDiff, gameStatus } = useGame();

  const {data} = useWordEngine(gameDiff, gameStatus);
  const chars = data.split("").map((char, i) => {
    let state: GameStatus
    if()
  })
  return (
    <div className="bg-neutral-900 min-h-screen">
      <Header />
    </div>
  );
}
