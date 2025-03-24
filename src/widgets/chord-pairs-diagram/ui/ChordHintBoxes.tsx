import { Chord } from "@/entities/chord";

export default function ChordHintBoxes({ chord }: { chord: Chord }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-center p-2 bg-blue-100 rounded-md shadow-sm">
        <div className="text-xs text-blue-700 font-semibold">Root</div>
        <div className="font-bold text-lg">{chord.root}</div>
      </div>
      <div className="text-center p-2 bg-purple-100 rounded-md shadow-sm">
        <div className="text-xs text-purple-700 font-semibold">Type</div>
        <div className="font-bold text-lg">{chord.type}</div>
      </div>
      <div className="text-center p-2 bg-green-100 rounded-md shadow-sm">
        <div className="text-xs text-green-700 font-semibold">Form</div>
        <div className="font-bold text-lg">{chord.form}</div>
      </div>
    </div>
  );
}
