import { useEffect, useState } from "react";
import { TIMER_DURATION } from "../config/constants";

export function useTimer({
  isStarted,
  setIsStarted,
}: {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
}) {
  const [currentTime, setCurrentTime] = useState(TIMER_DURATION);

  useEffect(() => {
    if (isStarted) {
      setCurrentTime(TIMER_DURATION);
    }
  }, [isStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStarted && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    } else if (currentTime <= 0 && isStarted) {
      setIsStarted(false);
    }

    return () => clearInterval(interval);
  }, [isStarted, currentTime, setIsStarted]);

  return { currentTime };
}
