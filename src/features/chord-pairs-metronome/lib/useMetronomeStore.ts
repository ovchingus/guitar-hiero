import { create } from "zustand";

export type BeatsPerMeasureType = 2 | 3 | 4 | 6;

interface MetronomeStore {
  playedNotesCount: number;
  setPlayedNotesCount: (playedNotesCount: number) => void;
  incrementPlayedNotesCount: () => void;
  beatsPerMeasure: BeatsPerMeasureType;
  setBeatsPerMeasure: (beatsPerMeasure: BeatsPerMeasureType) => void;
}

export const useMetronomeStore = create<MetronomeStore>((set) => ({
  playedNotesCount: -1,
  setPlayedNotesCount: (playedNotesCount: number) => set({ playedNotesCount }),
  incrementPlayedNotesCount: () =>
    set((state) => ({ playedNotesCount: state.playedNotesCount + 1 })),
  beatsPerMeasure: 4,
  setBeatsPerMeasure: (beatsPerMeasure: BeatsPerMeasureType) => set({ beatsPerMeasure }),
}));
