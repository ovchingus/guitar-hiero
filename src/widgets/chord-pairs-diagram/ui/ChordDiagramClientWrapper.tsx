"use client";

import { CHORDS } from "@/entities/chord";
import { useChordPairsStore } from "@/entities/chord-pairs";
import { METRONOME_STEPS } from "@/features/chord-pairs-metronome/config/constants";
import { useMetronomeStore } from "@/features/chord-pairs-metronome/lib/useMetronomeStore";
import { useEffect } from "react";
import { ChordDiagram } from "./ChordDiagram";

export function ChordDiagramClientWrapper() {
  const currentChord = useChordPairsStore((state) => state.currentChord);
  const setCurrentChord = useChordPairsStore((state) => state.setCurrentChord);
  const beatNumber = useMetronomeStore((state) => state.beatNumber);
  const noteLength = useChordPairsStore((state) => state.noteLength);

  useEffect(() => {
    if (beatNumber === 0) {
      return;
    }

    if (beatNumber % (METRONOME_STEPS / noteLength) === 0) {
      const availableChords = CHORDS.filter(
        (chord) => chord.name !== currentChord.name
      );
      const randomIndex = Math.floor(Math.random() * availableChords.length);
      setCurrentChord(availableChords[randomIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beatNumber]);

  return <ChordDiagram />;
}
