import { Trophy } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col px-6 py-12 justify-center items-center">
      <div className="flex justify-between w-full items-center">
        <div>
          <img src="/assets/logo-large.svg" alt="" />
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500 fill-yellow-500" />
          <p className="text-neutral-400 text-lg">Personal Best: </p>
          <p className="text-neutral-50">92 WPM</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
