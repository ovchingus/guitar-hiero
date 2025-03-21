import { useCallback, useRef } from "react";

// TODO: Remove this eslint-disable, properly type the function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback((...args: any[]) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
};
