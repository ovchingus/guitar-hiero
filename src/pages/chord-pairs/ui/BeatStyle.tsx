import { BeatStyleType } from "@/entities/chord-pairs/config/types";
import RadioButtons from "@/shared/ui/RadioButtons";

const OPTIONS: { value: BeatStyleType; label: string; disabled?: boolean }[] = [
  { value: "metronome", label: "Metronome" },
  { value: "drums", label: "Drums" },
];

export default function BeatStyle({
  value,
  onChange,
}: {
  value: BeatStyleType;
  onChange: (value: BeatStyleType) => void;
}) {
  return (
    <RadioButtons
      options={OPTIONS}
      name="beat-style"
      orientation="vertical"
      value={value}
      onChange={(value) => onChange(value as BeatStyleType)}
    />
  );
}
