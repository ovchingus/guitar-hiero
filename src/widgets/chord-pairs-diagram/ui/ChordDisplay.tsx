import { Chord } from "@/entities/chord";
import Image from "next/image";

export default function ChordDisplay({
  currentChord,
}: {
  currentChord: Chord;
}) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={currentChord.diagram}
        alt={currentChord.fullName}
        width={300}
        height={200}
      />
    </div>
  );
}
