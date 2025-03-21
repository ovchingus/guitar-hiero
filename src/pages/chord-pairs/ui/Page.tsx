import ChordDisplayClientWrapper from "./ChordDisplayClientWrapper";
import ChordHintBoxesClientWrapper from "./ChordHintBoxesClientWrapper";
import ClientPageWrapper from "./ClientPageWrapper";
import Settings from "./Settings";

// TODO: Divide into widgets and features and move to diff folders, instead of one heap of components
export default function Page() {
  return (
    <ClientPageWrapper>
      <div className="container mx-auto px-2 py-4 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Chord Pairs</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="order-3 md:order-1 bg-white p-3 rounded-lg shadow-sm">
              <Settings />
            </div>

            <div className="order-1 md:order-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <div className="aspect-square w-full max-w-md flex justify-center items-center">
                <ChordDisplayClientWrapper />
              </div>
            </div>

            <div className="order-2 bg-white rounded-lg shadow-sm">
              <ChordHintBoxesClientWrapper />
            </div>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
}
