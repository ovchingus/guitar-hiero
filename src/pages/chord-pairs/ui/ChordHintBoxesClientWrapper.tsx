"use client";

import { useChordPairsContext } from "@/features/chord-pairs/lib/ChordPairsContext";
import ChordHintBoxes from "./ChordHintBoxes";
import Controls from "./Controls";

export default function ChordHintBoxesClientWrapper() {
  const { currentChord } = useChordPairsContext();

  return (
    <div className="bg-white p-4">
      <ChordHintBoxes chord={currentChord} />

      <Controls />
    </div>
  );
}
