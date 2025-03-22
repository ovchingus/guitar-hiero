"use client";

import { DEFAULT_BEAT_STYLE } from "@/entities/chord-pairs/config/constants";
import { BeatStyleType } from "@/entities/chord-pairs/config/types";
import { useChordPairsStore } from "@/entities/chord-pairs/lib/useChordPairsStore";
import { useCreateQueryString } from "@/shared/lib/useCreateQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import BeatStyle from "./BeatStyle";

export default function BeatStyleClientWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();

  const beatStyle = useChordPairsStore((state) => state.beatStyle);
  const setBeatStyle = useChordPairsStore((state) => state.setBeatStyle);

  const queryBeatStyle = searchParams?.get("beatStyle") ?? DEFAULT_BEAT_STYLE;
  const initialBeatStyle: BeatStyleType = ["metronome", "drums"].includes(
    queryBeatStyle as BeatStyleType
  )
    ? (queryBeatStyle as BeatStyleType)
    : DEFAULT_BEAT_STYLE;

  const handleBeatStyleChange = useCallback(
    (value: BeatStyleType) => {
      setBeatStyle(value);
      router.push(pathname + "?" + createQueryString("beatStyle", value));
    },
    [createQueryString, pathname, router, setBeatStyle]
  );

  const isInitialBeatStyleSet = useRef(false);

  useEffect(() => {
    if (initialBeatStyle && !isInitialBeatStyleSet.current) {
      handleBeatStyleChange(initialBeatStyle);
      isInitialBeatStyleSet.current = true;
    }
  }, [handleBeatStyleChange, initialBeatStyle]);

  return <BeatStyle value={beatStyle} onChange={handleBeatStyleChange} />;
}
