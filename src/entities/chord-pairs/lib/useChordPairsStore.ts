import { CHORDS, Chord } from "@/entities/chord";
import { BeatStyleType } from "@/entities/chord-pairs";
import { create } from "zustand";
import { DEFAULT_BEAT_STYLE, DEFAULT_BPM } from "../config/constants";

interface ChordPairsStore {
  /**
   * Whether the game is started
   */
  isStarted: boolean;
  /**
   * Set whether the game is started
   */
  setIsStarted: (isStarted: boolean) => void;
  /**
   * The current chord
   */
  currentChord: Chord;
  /**
   * Set the current chord
   */
  setCurrentChord: (currentChord: Chord) => void;
  /**
   * The beat speed
   */
  bpm: number;
  /**
   * Set the beat speed
   */
  setBpm: (beat: number) => void;
  /**
   * The beat style
   */
  beatStyle: BeatStyleType;
  /**
   * Set the beat style
   */
  setBeatStyle: (beatStyle: BeatStyleType) => void;
}

export const useChordPairsStore = create<ChordPairsStore>((set) => ({
  isStarted: false,
  setIsStarted: (isStarted: boolean) => set({ isStarted }),
  currentChord: CHORDS[0],
  setCurrentChord: (currentChord: Chord) => set({ currentChord }),
  bpm: DEFAULT_BPM,
  setBpm: (beat: number) => set({ bpm: beat }),
  beatStyle: DEFAULT_BEAT_STYLE,
  setBeatStyle: (beatStyle: BeatStyleType) => set({ beatStyle }),
}));
