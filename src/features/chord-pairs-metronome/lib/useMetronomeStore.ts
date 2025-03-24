import { create } from "zustand";

interface MetronomeStore {
  beatNumber: number;
  setBeatNumber: (beatNumber: number) => void;
}

export const useMetronomeStore = create<MetronomeStore>((set) => ({
  beatNumber: 0,
  setBeatNumber: (beatNumber: number) => set({ beatNumber }),
}));
