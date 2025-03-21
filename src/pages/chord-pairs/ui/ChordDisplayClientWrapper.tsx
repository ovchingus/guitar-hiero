"use client";

import { useChordPairsContext } from "@/features/chord-pairs/lib/ChordPairsContext";
import ChordDisplay from "./ChordDisplay";

export default function ChordDisplayClientWrapper() {
  const { currentChord } = useChordPairsContext();

  return (
    <div>
      <ChordDisplay currentChord={currentChord} />
    </div>
  );
}
