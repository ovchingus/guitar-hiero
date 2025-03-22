import { useEffect, useState } from "react";

export function useTimer({
  isStarted,
  setIsStarted,
}: {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
}) {
  const [currentTime, setCurrentTime] = useState(0);

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

  const resetTimer = () => {
    setCurrentTime(60);
  };

  return { currentTime, resetTimer };
}
