import { useChordPairsStore } from "@/entities/chord-pairs";
import { useEffect } from "react";
import { useMetronome } from "../lib/useMetronome";
import { useMetronomeStore } from "../lib/useMetronomeStore";
import { Metronome } from "./Metronome";

export function MetronomeClientWrapper() {
  const isStarted = useChordPairsStore((state) => state.isStarted);
  const beat = useChordPairsStore((state) => state.bpm);
  const beatStyle = useChordPairsStore((state) => state.beatStyle);
  const beatNumber = useMetronomeStore((state) => state.beatNumber);

  const { start, stop, isPlaying } = useMetronome({
    beat: beat,
    beatStyle: beatStyle,
  });

  useEffect(() => {
    if (isStarted) {
      start();
    } else {
      stop();
    }
  }, [isStarted, start, stop]);

  return <Metronome beatNumber={beatNumber} isPlaying={isPlaying} />;
}
