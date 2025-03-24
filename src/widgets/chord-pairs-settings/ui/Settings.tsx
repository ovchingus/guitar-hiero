import { Suspense } from "react";
import { BeatSliderClientWrapper } from "./BeatSliderClientWrapper";
import { BeatStyleClientWrapper } from "./BeatStyleClientWrapper";

export function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">Beat Speed</div>
      <Suspense>
        <BeatSliderClientWrapper />
      </Suspense>

      <div className="text-lg font-bold">Beat Style</div>
      <Suspense>
        <BeatStyleClientWrapper />
      </Suspense>
    </div>
  );
}
