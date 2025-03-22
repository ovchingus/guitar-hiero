import { CHORDS } from "@/entities/chord/config/constants";
import { Chord } from "@/entities/chord/config/types";
import { BeatStyleType } from "@/entities/chord-pairs/config/types";
import { create } from "zustand";
import { DEFAULT_BEAT_STYLE } from "../config/constants";
import { DEFAULT_BEAT } from "../config/constants";

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
  beat: number;
  /**
   * Set the beat speed
   */
  setBeat: (beat: number) => void;
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
  beat: DEFAULT_BEAT,
  setBeat: (beat: number) => set({ beat }),
  beatStyle: DEFAULT_BEAT_STYLE,
  setBeatStyle: (beatStyle: BeatStyleType) => set({ beatStyle }),
}));
