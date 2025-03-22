import { useCallback, useEffect, useRef, useState } from "react";

interface UseMetronomeProps {
  /**
   * Beats per minute
   */
  beat?: number;
  /**
   * Style of the metronome
   */
  beatStyle?: "metronome" | "drums";
  /**
   * Callback with current beat count
   */
  onBeat?: (beatCount: number) => void;
}

export interface UseMetronomeReturnType {
  /**
   * Start the metronome
   */
  start: () => void;
  /**
   * Stop the metronome
   */
  stop: () => void;
  /**
   * Whether the metronome is playing
   */
  isPlaying: boolean;
}

// Calculate interval in milliseconds from BPM
const getIntervalFromSpeed = (bpm: number) => {
  return 60000 / bpm;
};

export function useMetronome({
  beat = 60,
  beatStyle = "metronome",
  onBeat,
}: UseMetronomeProps = {}): UseMetronomeReturnType {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const beatsCountRef = useRef<number>(0);

  // TODO: Use audio context from useAudioContext

  // Create and play a sound
  const playSound = useCallback(() => {
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

    const context = audioContextRef.current;

    if (!context) {
      console.error("AudioContext not supported in this browser");
      return;
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    if (beatStyle === "metronome") {
      oscillator.type = "sine";
      // TODO: Get better metronome sound
      oscillator.frequency.value = 880; // A5 note
      gainNode.gain.value = 0.5;

      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
    } else if (beatStyle === "drums") {
      oscillator.type = "triangle";
      oscillator.frequency.value = 150;
      gainNode.gain.value = 0.8;

      // TODO: Get real drums sound
      gainNode.gain.setValueAtTime(0.8, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.2
      );

      oscillator.start();
      oscillator.stop(context.currentTime + 0.2);
    }

    beatsCountRef.current += 1;
    if (onBeat) {
      onBeat(beatsCountRef.current);
    }
  }, [beatStyle, onBeat]);

  const start = useCallback(() => {
    if (isPlaying) return;

    setIsPlaying(true);
    beatsCountRef.current = 0;

    // Play immediately on start
    playSound();

    // Set up interval for subsequent beats
    const interval = getIntervalFromSpeed(beat);
    intervalIdRef.current = setInterval(playSound, interval);
  }, [beat, isPlaying, playSound]);

  const stop = useCallback(() => {
    if (!isPlaying) return;

    setIsPlaying(false);

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, [isPlaying]);

  // Update interval when playSound changes (which includes onBeat updates)
  useEffect(() => {
    if (isPlaying && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      const interval = getIntervalFromSpeed(beat);
      intervalIdRef.current = setInterval(playSound, interval);
    }
  }, [playSound, beat, isPlaying]);

  // Clean up on unmount
  useEffect(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  }, []);

  return {
    start,
    stop,
    isPlaying,
  };
}
