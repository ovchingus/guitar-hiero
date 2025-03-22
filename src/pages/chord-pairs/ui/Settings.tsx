import BeatSliderClientWrapper from "./BeatSliderClientWrapper";
import BeatStyleClientWrapper from "./BeatStyleClientWrapper";

export default function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">Beat Speed</div>
      <BeatSliderClientWrapper />

      <div className="text-lg font-bold">Beat Style</div>
      <BeatStyleClientWrapper />
    </div>
  );
}
