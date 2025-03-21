"use client";

import { useChordPairsContext } from "@/features/chord-pairs/lib/ChordPairsContext";
import BeatSlider from "./BeatSlider";
import BeatStyle from "./BeatStyle";

export default function Settings() {
  const { beat, handleBeatChange, beatStyle, handleBeatStyleChange } =
    useChordPairsContext();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">Beat Speed</div>
        <BeatSlider
          value={beat}
          onChange={handleBeatChange}
          min={40}
          max={220}
        />

        <div className="text-lg font-bold">Beat Style</div>
        <BeatStyle value={beatStyle} onChange={handleBeatStyleChange} />
      </div>
    </>
  );
}
