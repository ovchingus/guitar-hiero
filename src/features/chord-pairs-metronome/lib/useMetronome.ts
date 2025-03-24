import { BeatStyleType } from "@/entities/chord-pairs";
import { useAudioContext } from "@/shared/lib/useAudioContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMetronomeStore } from "./useMetronomeStore";

interface UseMetronomeProps {
  /**
   * Beats per minute
   */
  beat?: number;
  /**
   * Style of the metronome
   */
  beatStyle?: BeatStyleType;
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
  return 60_000 / bpm;
};

export function useMetronome({
  beat = 60,
  beatStyle = "metronome",
  onBeat,
}: UseMetronomeProps = {}): UseMetronomeReturnType {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const audioContext = useAudioContext();

  const setBeatNumber = useMetronomeStore((state) => state.setBeatNumber);
  const beatNumber = useMetronomeStore((state) => state.beatNumber);

  const playSoundOnce = useCallback(() => {
    const context = audioContext;

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

    setBeatNumber(beatNumber + 1);

    if (onBeat) {
      onBeat(beatNumber + 1);
    }
  }, [audioContext, beatNumber, beatStyle, onBeat, setBeatNumber]);

  const start = useCallback(() => {
    if (isPlaying) return;

    setIsPlaying(true);
    setBeatNumber(0);

    // Play immediately on start
    playSoundOnce();

    // Set up interval for subsequent beats
    const interval = getIntervalFromSpeed(beat);
    intervalIdRef.current = setInterval(playSoundOnce, interval);
  }, [beat, isPlaying, playSoundOnce, setBeatNumber]);

  const stop = useCallback(() => {
    if (!isPlaying) return;

    setIsPlaying(false);
    setBeatNumber(0);

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, [isPlaying, setBeatNumber]);

  // Update interval when playSound changes (which includes onBeat updates)
  // This is a hack to ensure onBeat function updates inside playSound
  // Otherwise, onBeat function will be enclosed with initial state
  // TODO: Find a better solution
  useEffect(() => {
    if (isPlaying && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      const interval = getIntervalFromSpeed(beat);
      intervalIdRef.current = setInterval(playSoundOnce, interval);
    }
  }, [playSoundOnce, beat, isPlaying]);

  return { start, stop, isPlaying };
}
