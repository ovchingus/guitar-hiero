"use client";

import { useChordPairsStore } from "@/entities/chord-pairs";
import { Metronome } from "@/features/chord-pairs-metronome";
import { CountdownTimer } from "@/features/chord-pairs-timer";
import Button from "@/shared/ui/Button";

export function Controls() {
  const isStarted = useChordPairsStore((state) => state.isStarted);
  const setIsStarted = useChordPairsStore((state) => state.setIsStarted);

  const handleClick = () => {
    if (isStarted) {
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <CountdownTimer />
      <Metronome />
      <Button
        variant={isStarted ? "secondary" : "primary"}
        size="md"
        className="w-full"
        onClick={handleClick}
      >
        {isStarted ? "Stop" : "Start"}
      </Button>
    </div>
  );
}
