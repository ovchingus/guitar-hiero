"use client";

import {
  BeatStyleType,
  DEFAULT_BEAT_STYLE,
  useChordPairsStore,
} from "@/entities/chord-pairs";
import { useCreateQueryString } from "@/shared/lib/useCreateQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { BeatStyle } from "./BeatStyle";

export function BeatStyleClientWrapper() {
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
