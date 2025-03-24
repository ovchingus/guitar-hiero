"use client";

import { useChordPairsStore } from "@/entities/chord-pairs";
import ChordDisplay from "./ChordDisplay";

export default function ChordDisplayClientWrapper() {
  const currentChord = useChordPairsStore((state) => state.currentChord);

  return <ChordDisplay currentChord={currentChord} />;
}
