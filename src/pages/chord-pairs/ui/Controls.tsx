"use client";

import { useChordPairsStore } from "@/entities/chord-pairs/lib/useChordPairsStore";
import { CHORDS } from "@/entities/chord/config/constants";
import { useMetronome } from "@/features/metronome/lib/useMetronome";
import { useTimer } from "@/features/chord-pairs/lib/useTimer";
import Button from "@/shared/ui/Button";
import { useCallback } from "react";
import CountdownTimer from "./CountdownTimer";

export default function Controls() {
  const isStarted = useChordPairsStore((state) => state.isStarted);
  const setIsStarted = useChordPairsStore((state) => state.setIsStarted);
  const beat = useChordPairsStore((state) => state.beat);
  const beatStyle = useChordPairsStore((state) => state.beatStyle);
  const currentChord = useChordPairsStore((state) => state.currentChord);
  const setCurrentChord = useChordPairsStore((state) => state.setCurrentChord);

  console.log("Current chord", currentChord);

  const handleChangeChord = useCallback((beatCount: number) => {
    console.log("Beat count", beatCount);
    if (beatCount % 4 === 0) {
      console.log("Changing chord", currentChord);
      // TODO: Let user choose which chord to change to, define a list of available chords
      const availableChords = CHORDS.filter(
        (chord) => chord.name !== currentChord.name
      );
      const randomIndex = Math.floor(Math.random() * availableChords.length);
      setCurrentChord(availableChords[randomIndex]);
    }
  }, [currentChord, setCurrentChord]);

  const { start, stop } = useMetronome({
    beat: beat,
    beatStyle: beatStyle,
    onBeat: handleChangeChord,
  });

  const { currentTime, resetTimer } = useTimer({
    isStarted,
    setIsStarted,
  });

  const handleClick = () => {
    if (isStarted) {
      stop();
      setIsStarted(false);
    } else {
      resetTimer();
      start();
      setIsStarted(true);
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
