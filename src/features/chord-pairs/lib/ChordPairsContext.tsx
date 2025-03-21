"use client";

import { CHORDS } from "@/entities/chord/config/constants";
import { Chord } from "@/entities/chord/config/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBeat, UseBeatReturnType } from "./useBeat";
import { useBeatStyle, UseBeatStyleReturnType } from "./useBeatStyle";
import { useMetronome } from "./useMetronome";

interface ChordPairsContextType extends UseBeatReturnType, UseBeatStyleReturnType {
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
  currentTime: number;
  setCurrentTime: (value: number) => void;
  resetTimer: () => void;
  currentChord: Chord;
  changeChord: () => void;
  start: () => void;
  stop: () => void;
}

const ChordPairsContext = createContext<ChordPairsContextType | undefined>(undefined);

export function useChordPairsContext() {
  const context = useContext(ChordPairsContext);
  if (context === undefined) {
    throw new Error("usePageState must be used within a PageStateProvider");
  }
  return context;
}

export function ChordPairsContextProvider({ children }: { children: ReactNode }) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentChord, setCurrentChord] = useState<Chord>(CHORDS[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStarted && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    } else if (currentTime <= 0 && isStarted) {
      setIsStarted(false);
    }

    return () => clearInterval(interval);
  }, [isStarted, currentTime]);

  const resetTimer = () => {
    setCurrentTime(60);
  };

  const changeChord = () => {
    const availableChords = CHORDS.filter(
      (chord) => chord.name !== currentChord.name
    );
    const randomIndex = Math.floor(Math.random() * availableChords.length);
    setCurrentChord(availableChords[randomIndex]);
  };

  const beatProps = useBeat();
  const beatStyleProps = useBeatStyle();

  const handleChangeChord = (beatCount: number) => {
    if (beatCount % 4 === 0) {
      changeChord();
    }
  };

  const metronome = useMetronome({
    beat: beatProps.beat,
    beatStyle: beatStyleProps.beatStyle,
    onBeat: handleChangeChord,
  });

  const start = () => {
    setIsStarted(true);
    resetTimer();
    metronome.start();
  };

  const stop = () => {
    setIsStarted(false);
    metronome.stop();
  };

  return (
    <ChordPairsContext.Provider
      value={{
        isStarted,
        setIsStarted,
        currentTime,
        setCurrentTime,
        resetTimer,
        currentChord,
        changeChord,
        ...beatProps,
        ...beatStyleProps,
        start,
        stop,
      }}
    >
      {children}
    </ChordPairsContext.Provider>
  );
}
