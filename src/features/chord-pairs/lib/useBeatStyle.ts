import { useCallback, useEffect, useState } from "react";
import { DEFAULT_BEAT_STYLE } from "../config/constants";

import { usePathname, useSearchParams } from "next/navigation";

import { useCreateQueryString } from "@/shared/lib/useCreateQueryString";
import { useRouter } from "next/navigation";
import { BeatStyleType } from "../config/types";

export interface UseBeatStyleReturnType {
  /**
   * Current beat style
   */
  beatStyle: BeatStyleType;
  /**
   * Set the beat style
   */
  setBeatStyle: (value: BeatStyleType) => void;
  /**
   * Handle the beat style change
   */
  handleBeatStyleChange: (value: BeatStyleType) => void;
}

export function useBeatStyle(): UseBeatStyleReturnType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();

  const queryBeatStyle = searchParams?.get("beatStyle") ?? DEFAULT_BEAT_STYLE;
  const initialBeatStyle: BeatStyleType = ["metronome", "drums"].includes(
    queryBeatStyle as BeatStyleType
  )
    ? (queryBeatStyle as BeatStyleType)
    : DEFAULT_BEAT_STYLE;
  const [beatStyle, setBeatStyle] = useState<BeatStyleType>(initialBeatStyle);

  const handleBeatStyleChange = useCallback(
    (value: BeatStyleType) => {
      setBeatStyle(value);
      router.push(pathname + "?" + createQueryString("beatStyle", value));
    },
    [createQueryString, pathname, router]
  );

  useEffect(() => {
    if (!initialBeatStyle) {
      handleBeatStyleChange(DEFAULT_BEAT_STYLE);
    }
  }, [handleBeatStyleChange, initialBeatStyle]);

  return {
    beatStyle,
    setBeatStyle,
    handleBeatStyleChange,
  };
}
