import { BeatsPerMeasureType } from "../lib/useMetronomeStore";

export function Metronome({
  isPlaying,
  playedNotesCount,
  beatsPerMeasure,
  timeSignatureCount,
}: {
  isPlaying: boolean;
  playedNotesCount: number;
  beatsPerMeasure: BeatsPerMeasureType;
  timeSignatureCount: number;
}) {
  const currentBeatIndex = playedNotesCount % beatsPerMeasure;
  console.log(timeSignatureCount, beatsPerMeasure);

  const getBeatIconClassName = (beatIndex: number) => {
    const isCurrentBeat = currentBeatIndex === beatIndex;

    if (isCurrentBeat && isPlaying) {
      return `bg-blue-500`;
    }

    if (isCurrentBeat && !isPlaying) {
      return `bg-gray-500`;
    }

    return `bg-transparent`;
  };

  const beatsArray = Array.from({ length: 16 });

  return (
    <div className="flex flex-wrap gap-2">
      {beatsArray.map((_, beatIndex) => (
        <div
          key={beatIndex}
          className={`w-4 h-4 rounded-full border-2 border-gray-400 ${getBeatIconClassName(
            beatIndex
          )}`}
        />
      ))}
    </div>
  );
}
