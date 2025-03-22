import { useEffect, useRef } from "react";

// TODO: Use state instead of ref
export const useAudioContext = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Clean up on unmount
  useEffect(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  }, []);

  if (!audioContextRef.current) {
    try {
      audioContextRef.current = new AudioContext();
    } catch (error) {
      // TODO: Fix typing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const webkitAudioContext = (window as any).webkitAudioContext;

      if (webkitAudioContext) {
        audioContextRef.current = new webkitAudioContext();
      } else {
        console.error("AudioContext not supported in this browser", error);
        return;
      }
    }
  }

  return audioContextRef.current;
};
