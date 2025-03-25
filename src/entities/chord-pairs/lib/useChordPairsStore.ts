import { CHORDS, Chord } from "@/entities/chord";
import { BeatStyleType } from "@/entities/chord-pairs";
import { create } from "zustand";
import { DEFAULT_BEAT_STYLE, DEFAULT_BPM } from "../config/constants";

/**
 * The note length.
 * 1 eq whole note
 * 2 eq 1/2 - half note
 * 4 eq 1/4 - quarter note
 * 8 eq 1/8 - eighth note
 * 16 eq 1/16 - sixteenth note
 */
export type NoteLengthType = 1 | 2 | 4 | 8 | 16;

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
  /**
   * The note length
   */
  noteLength: NoteLengthType;
  /**
   * Set the note length
   */
  setNoteLength: (noteLength: NoteLengthType) => void;
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
  noteLength: 1,
  setNoteLength: (noteLength: NoteLengthType) => set({ noteLength }),
}));
