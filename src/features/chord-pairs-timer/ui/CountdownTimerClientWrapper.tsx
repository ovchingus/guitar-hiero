"use client";

import { useChordPairsStore } from "@/entities/chord-pairs/lib/useChordPairsStore";
import { useTimer } from "../lib/useTimer";
import CountdownTimer from "./CountdownTimer";

export default function CountdownTimerClientWrapper() {
  const isStarted = useChordPairsStore((state) => state.isStarted);
  const setIsStarted = useChordPairsStore((state) => state.setIsStarted);

  const { currentTime } = useTimer({
    isStarted,
    setIsStarted,
  });

  return <CountdownTimer time={currentTime} />;
}
