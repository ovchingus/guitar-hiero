"use client";

import { ReactNode } from "react";
import { ChordPairsContextProvider } from "@/features/chord-pairs/lib/ChordPairsContext";

export default function ClientPageWrapper({ children }: { children: ReactNode }) {
  return (
    <ChordPairsContextProvider>
      {children}
    </ChordPairsContextProvider>
  );
} 
