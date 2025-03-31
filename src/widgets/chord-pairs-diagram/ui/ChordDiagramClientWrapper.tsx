"use client";

import { CHORDS } from "@/entities/chord";
import { useChordPairsStore } from "@/entities/chord-pairs";
import { useMetronomeStore } from "@/features/chord-pairs-metronome/lib/useMetronomeStore";
import { useEffect } from "react";
import { ChordDiagram } from "./ChordDiagram";

const CHORD_CHANGE_BY_METRONOME_NOTE_LENGTH_MAP = {
  1: 4,
  2: 2,
  4: 1,
  8: 1,
  16: 1,
} as const;

export function ChordDiagramClientWrapper() {
  const currentChord = useChordPairsStore((state) => state.currentChord);
  const setCurrentChord = useChordPairsStore((state) => state.setCurrentChord);
  const beatNumber = useMetronomeStore((state) => state.playedNotesCount);
  const noteLength = useChordPairsStore((state) => state.noteValue);

  useEffect(() => {
    if (beatNumber === 0) {
      return;
    }

    if (beatNumber % CHORD_CHANGE_BY_METRONOME_NOTE_LENGTH_MAP[noteLength] === 0) {
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
