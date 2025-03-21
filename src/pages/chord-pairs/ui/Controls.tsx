"use client";

import Button from "@/shared/ui/Button";
import { useChordPairsContext } from "@/features/chord-pairs/lib/ChordPairsContext";
import CountdownTimer from "./CountdownTimer";

export default function Controls() {
  const { isStarted, start, stop, currentTime } = useChordPairsContext();

  const handleClick = () => {
    if (isStarted) {
      stop();
    } else {
      start();
    }
  };

  return (
      <div className="flex flex-col gap-2">
        <Button
          variant={isStarted ? "secondary" : "primary"}
          size="md"
          className="w-full"
          onClick={handleClick}
        >
          {isStarted ? "Stop" : "Start"}
        </Button>
        <CountdownTimer time={currentTime} />
      </div>
  );
}
