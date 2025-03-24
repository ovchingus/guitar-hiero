import { Paper } from "@/shared/ui/Paper";
import { ChordDiagram } from "@/widgets/chord-pairs-diagram";
import { Settings } from "@/widgets/chord-pairs-settings";
import { Controls } from "./Controls";

export function ChordPairsPage() {
  return (
    <div className="container mx-auto px-2 py-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chord Pairs</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Paper className="order-3 md:order-1">
            <Settings />
          </Paper>

          <Paper className="order-1 md:order-2 md:col-span-1">
            <ChordDiagram />
          </Paper>

          <Paper className="order-2 md:order-3">
            <Controls />
          </Paper>
        </div>
      </div>
    </div>
  );
}
