import { useChordPairsStore } from "@/entities/chord-pairs";
import { useEffect } from "react";
import { useMetronome } from "../lib/useMetronome";
import { Metronome } from "./Metronome";
import { useMetronomeStore } from "../lib/useMetronomeStore";

export function MetronomeClientWrapper() {
  const isStarted = useChordPairsStore((state) => state.isStarted);
  const tempo = useChordPairsStore((state) => state.bpm);
  const beatsPerMeasure = useMetronomeStore((state) => state.beatsPerMeasure);
  const noteValue = useChordPairsStore((state) => state.noteValue);

  const { start, stop, isPlaying, playedNotesCount } = useMetronome({
    tempo: tempo,
    masterVolume: 1,
    accentVolume: 1,
    quarterVolume: 1,
    eighthVolume: 0,
    sixteenthVolume: 0,
    tripletVolume: 0,
  });

  useEffect(() => {
    if (isStarted) {
      start();
    } else {
      stop();
    }
  }, [isStarted, start, stop]);

  return (
    <Metronome
      timeSignatureCount={noteValue}
      beatsPerMeasure={beatsPerMeasure}
      isPlaying={isPlaying}
      playedNotesCount={playedNotesCount}
    />
  );
}
