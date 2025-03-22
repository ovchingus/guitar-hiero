"use client";

import { useChordPairsStore } from "@/entities/chord-pairs/lib/useChordPairsStore";
import ChordHintBoxes from "./ChordHintBoxes";
import Controls from "./Controls";

export default function ChordHintBoxesClientWrapper() {
  const currentChord = useChordPairsStore((state) => state.currentChord);

  return (
    <div className="bg-white p-4">
      <ChordHintBoxes chord={currentChord} />
      <Controls />
    </div>
  );
}
