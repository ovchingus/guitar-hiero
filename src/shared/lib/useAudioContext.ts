import { useEffect, useRef } from "react";

const getAudioContext = () => {
  try {
    return new AudioContext();
  } catch (error) {
    console.error("AudioContext not supported in this browser", error);
    return null;
  }
};

/**
 * A hook to use audio context browser API
 */
export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = getAudioContext();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return audioContextRef.current;
}
