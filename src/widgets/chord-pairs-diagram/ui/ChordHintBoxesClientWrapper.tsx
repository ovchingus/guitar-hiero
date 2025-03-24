"use client";

import { useChordPairsStore } from "@/entities/chord-pairs";
import ChordHintBoxes from "./ChordHintBoxes";

export default function ChordHintBoxesClientWrapper() {
  const currentChord = useChordPairsStore((state) => state.currentChord);

  return <ChordHintBoxes chord={currentChord} />;
}
