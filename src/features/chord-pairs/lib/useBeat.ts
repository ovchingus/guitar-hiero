import { useCreateQueryString } from "@/shared/lib/useCreateQueryString";
import { useDebounce } from "@/shared/lib/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_BEAT } from "../config/constants";

export interface UseBeatReturnType {
  /**
   * Current beat
   */
  beat: number;
  /**
   * Set the beat
   */
  setBeat: (value: number) => void;
  /**
   * Handle the beat change
   */
  handleBeatChange: (value: number) => void;
}

export function useBeat(): UseBeatReturnType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const initialBeat = Number(searchParams?.get("beat"));

  const [beat, setBeat] = useState(initialBeat || DEFAULT_BEAT);

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

  useEffect(() => {
    if (!initialBeat) {
      handleBeatChange(DEFAULT_BEAT);
    }
  }, [initialBeat, handleBeatChange]);

  return { beat, setBeat, handleBeatChange };
}
