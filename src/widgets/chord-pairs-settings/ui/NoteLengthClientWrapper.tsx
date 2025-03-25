"use client";

import { NoteLengthType, useChordPairsStore } from "@/entities/chord-pairs";
import Select from "@/shared/ui/Select";

const NOTE_LENGTH_OPTIONS = [1, 2, 4, 8, 16] as NoteLengthType[];

const LABEL_MAP = {
  1: "Whole Note",
  2: "Half Note",
  4: "Quarter Note",
  8: "Eighth Note",
  16: "Sixteenth Note",
};

export function NoteLengthClientWrapper() {
  const noteLength = useChordPairsStore((state) => state.noteLength);
  const setNoteLength = useChordPairsStore((state) => state.setNoteLength);

  const options = NOTE_LENGTH_OPTIONS.map((option) => ({
    value: option,
    label: LABEL_MAP[option],
  }));

  return (
    <Select
      options={options}
      value={noteLength}
      onChange={(value) => setNoteLength(value as NoteLengthType)}
    />
  );
}
