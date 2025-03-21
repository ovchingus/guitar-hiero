import { Chord } from "@/entities/chord/config/types";
import Image from "next/image";

export default function ChordDisplay({
  currentChord,
}: {
  currentChord: Chord;
}) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-2">{currentChord.fullName}</h3>
      <div className="relative">
        <Image
          src={currentChord.diagram}
          alt={currentChord.fullName}
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
