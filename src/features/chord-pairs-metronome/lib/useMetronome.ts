import { useChordPairsStore } from "@/entities/chord-pairs";
import { Metronome } from "@/entities/metronome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMetronomeStore } from "./useMetronomeStore";

interface UseMetronomeProps {
  /**
   * Beats per minute
   */
  tempo?: number;
  /**
   * Number of beats per measure
   */
  meter?: number;
  /**
   * Volume settings
   */
  masterVolume?: number;
  accentVolume?: number;
  quarterVolume?: number;
  eighthVolume?: number;
  sixteenthVolume?: number;
  tripletVolume?: number;
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
  /**
   * The number of notes played
   */
  playedNotesCount: number;
}

export function useMetronome({
  tempo = 120,
  meter = 4,
  masterVolume = 0.5,
  accentVolume = 1,
  quarterVolume = 0.75,
  eighthVolume = 0,
  sixteenthVolume = 0,
  tripletVolume = 0,
}: UseMetronomeProps = {}): UseMetronomeReturnType {
  const [isPlaying, setIsPlaying] = useState(false);
  const metronomeRef = useRef<Metronome | null>(null);
  const {
    playedNotesCount,
    setPlayedNotesCount,
    incrementPlayedNotesCount,
    beatsPerMeasure,
  } = useMetronomeStore();
  const noteValue = useChordPairsStore((state) => state.noteValue);

  console.log(playedNotesCount)
  useEffect(() => {
    metronomeRef.current = new Metronome({
      tempo,
      meter: beatsPerMeasure,
      masterVolume,
      accentVolume,
      quarterVolume,
      eighthVolume,
      sixteenthVolume,
      tripletVolume,
      onPlayedNote: ({
        isWholeNote,
        isHalfNote,
        isQuarterNote,
        isEighthNote,
        isSixteenthNote,
      }) => {
        if (noteValue === 1 && isWholeNote) {
          incrementPlayedNotesCount();
        }

        if (noteValue === 2 && isHalfNote) {
          incrementPlayedNotesCount();
        }

        if (noteValue === 4 && isQuarterNote) {
          incrementPlayedNotesCount();
        }

        if (noteValue === 8 && isEighthNote) {
          incrementPlayedNotesCount();
        }

        if (noteValue === 16 && isSixteenthNote) {
          incrementPlayedNotesCount();
        }
      },
    });

    return () => {
      metronomeRef.current?.dispose();
    };
  }, [
    tempo,
    meter,
    masterVolume,
    accentVolume,
    quarterVolume,
    eighthVolume,
    sixteenthVolume,
    tripletVolume,
    incrementPlayedNotesCount,
    beatsPerMeasure,
    noteValue,
  ]);

  const start = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    metronomeRef.current?.start();
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (!isPlaying) return;
    setIsPlaying(false);
    setPlayedNotesCount(-1);
    metronomeRef.current?.stop();
  }, [isPlaying, setPlayedNotesCount]);

  return { start, stop, isPlaying, playedNotesCount };
}
