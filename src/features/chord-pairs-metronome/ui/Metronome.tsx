import { METRONOME_STEPS } from "../config/constants";

export function Metronome({
  beatNumber,
  isPlaying,
}: {
  beatNumber: number;
  isPlaying: boolean;
}) {
  const currentBeatIndex = beatNumber % METRONOME_STEPS;

  const getBeatIconClassName = (beatIconIndex: number) => {
    const isCurrentBeat = currentBeatIndex === beatIconIndex;

    if (isCurrentBeat && isPlaying) {
      return "bg-blue-500";
    }

    if (isCurrentBeat && !isPlaying) {
      return "bg-gray-500";
    }

    return "bg-transparent";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {Array.from({ length: METRONOME_STEPS }).map((_, beatIconIndex) => (
          <div
            key={beatIconIndex}
            className={`w-4 h-4 rounded-full border-2 border-gray-400 ${getBeatIconClassName(
              beatIconIndex
            )}`}
          />
        ))}
      </div>
    </div>
  );
}
