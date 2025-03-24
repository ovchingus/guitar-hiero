import ChordDisplayClientWrapper from "./ChordDisplayClientWrapper";
import ChordHintBoxesClientWrapper from "./ChordHintBoxesClientWrapper";

export function ChordDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <h3 className="text-lg font-bold">Chord Details</h3>
      <ChordHintBoxesClientWrapper />
      <ChordDisplayClientWrapper />
    </div>
  );
}
