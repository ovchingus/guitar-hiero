import { useCallback, useRef, useEffect } from "react";

export const useDebounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function to clear timeout
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: T) => {
      // Clear existing timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set new timeout
      timeoutIdRef.current = setTimeout(() => {
        try {
          func(...args);
        } catch (error) {
          console.error("Error in debounced function:", error);
        }
      }, delay);
    },
    [func, delay]
  );
};
