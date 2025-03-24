"use client";

import { useChordPairsStore } from "@/entities/chord-pairs";
import { useCreateQueryString } from "@/shared/lib/useCreateQueryString";
import { useDebounce } from "@/shared/lib/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { BeatSlider } from "./BeatSlider";

export function BeatSliderClientWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const initialBeat = Number(searchParams?.get("beat"));

  const beat = useChordPairsStore((state) => state.bpm);
  const setBeat = useChordPairsStore((state) => state.setBpm);

  const setBeatQueryCallback = useCallback(
    (value: number) => {
      router.push(pathname + "?" + createQueryString("beat", value.toString()));
    },
    [router, pathname, createQueryString]
  );

  const setBeatQuery = useDebounce(setBeatQueryCallback, 300);

  const handleBeatChange = useCallback(
    (value: number) => {
      setBeat(value);
      setBeatQuery(value);
    },
    [setBeat, setBeatQuery]
  );

  const isInitialBeatSet = useRef(false);

  useEffect(() => {
    if (initialBeat && !isInitialBeatSet.current) {
      handleBeatChange(initialBeat);
      isInitialBeatSet.current = true;
    }
  }, [initialBeat, handleBeatChange]);

  return (
    <BeatSlider value={beat} onChange={handleBeatChange} min={40} max={220} />
  );
}
