import { NoteLengthType } from "@/entities/chord-pairs";

const NOTE_LENGTH_OPTIONS = [1, 2, 4, 8, 16] as NoteLengthType[];

export function NoteLength({
  noteLength,
  setNoteLength,
}: {
  noteLength: NoteLengthType;
  setNoteLength: (noteLength: NoteLengthType) => void;
}) {
  return (
    <div>
      <select
        value={noteLength}
        onChange={(e) =>
          setNoteLength(Number(e.target.value) as NoteLengthType)
        }
      >
        {NOTE_LENGTH_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
