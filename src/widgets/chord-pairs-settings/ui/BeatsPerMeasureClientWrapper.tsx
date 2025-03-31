"use client";

import { BeatsPerMeasureType, useMetronomeStore } from "@/features/chord-pairs-metronome/lib/useMetronomeStore";
import Select from "@/shared/ui/Select";

const BEATS_PER_MEASURE_OPTIONS = [2, 3, 4, 6] as BeatsPerMeasureType[];

const LABEL_MAP = {
  2: "2/4",
  3: "3/4",
  4: "4/4",
  6: "6/8",
};

export function BeatsPerMeasureClientWrapper() {
  const beatsPerMeasure  = useMetronomeStore((state) => state.beatsPerMeasure);
  const setBeatsPerMeasure = useMetronomeStore((state) => state.setBeatsPerMeasure);

  const options = BEATS_PER_MEASURE_OPTIONS.map((option) => ({
    value: option,
    label: LABEL_MAP[option],
  }));

  return (
    <Select
      label="Beats per measure"
      options={options}
      value={beatsPerMeasure}
      onChange={(value) => setBeatsPerMeasure(value as BeatsPerMeasureType)}
    />
  );
}
