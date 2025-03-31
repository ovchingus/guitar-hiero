import { TWELVELET } from "@/entities/note";
import { MetronomeWorkerOutputMessage } from "../config/types";

type OnPlayedNoteCallback = (beat: {
  isWholeNote?: boolean;
  isHalfNote?: boolean;
  isQuarterNote?: boolean;
  isEighthNote?: boolean;
  isTripletNote?: boolean;
  isSixteenthNote?: boolean;
}) => void;

interface MetronomeOptions {
  /**
   * Beats per minute
   */
  tempo?: number;
  /**
   * Number of beats per measure
   * Now it's support 2/4 (cut time) 3/4 (waltz), 4/4 (common), 6/8 (compound)
   */
  meter?: 2 | 3 | 4 | 6;
  masterVolume?: number;
  accentVolume?: number;
  wholeVolume?: number;
  halfVolume?: number;
  quarterVolume?: number;
  eighthVolume?: number;
  sixteenthVolume?: number;
  tripletVolume?: number;
  /**
   * Callback function that will be called on each beat
   */
  onPlayedNote?: OnPlayedNoteCallback;
}

interface ScheduledNote {
  note: number;
  time: number;
}

export class Metronome {
  private worker: Worker | null = null;
  private audioContext: AudioContext | null = null;
  private isPlaying = false;
  private nextNoteTime = 0;
  private currentTwelveletNote = 0;
  private notesInQueue: ScheduledNote[] = [];

  private readonly lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  private readonly scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  private readonly noteLength = 0.05; // length of "beep" (in seconds)

  private options: Required<MetronomeOptions>;

  constructor(options: MetronomeOptions = {}) {
    this.audioContext = new AudioContext();

    if (!this.audioContext) {
      throw new Error("AudioContext not supported in this browser");
    }

    this.options = {
      tempo: options.tempo ?? 60,
      meter: options.meter ?? 4,
      masterVolume: options.masterVolume ?? 0.5,
      accentVolume: options.accentVolume ?? 1,
      wholeVolume: options.wholeVolume ?? 0.75,
      halfVolume: options.halfVolume ?? 0.75,
      quarterVolume: options.quarterVolume ?? 0.75,
      eighthVolume: options.eighthVolume ?? 0,
      sixteenthVolume: options.sixteenthVolume ?? 0,
      tripletVolume: options.tripletVolume ?? 0,
      onPlayedNote: options.onPlayedNote ?? (() => undefined),
    };

    this.worker = new Worker(new URL("./worker.ts", import.meta.url));
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.worker.postMessage({ type: "interval", interval: this.lookahead });
  }

  private handleWorkerMessage(
    event: MessageEvent<MetronomeWorkerOutputMessage>
  ): void {
    if (event.data.type === "tick") {
      this.scheduler();
    }
  }

  private maxBeats(): number {
    return this.options.meter * TWELVELET;
  }

  private nextTwelvelet(): void {
    const secondsPerBeat = 60.0 / this.options.tempo;
    this.nextNoteTime += 0.08333 * secondsPerBeat;
    this.currentTwelveletNote++;

    if (this.currentTwelveletNote === this.maxBeats()) {
      this.currentTwelveletNote = 0;
    }
  }

  private calcVolume(beatVolume: number): number {
    return beatVolume * this.options.masterVolume;
  }

  private scheduleNote(beatNumber: number, time: number): void {
    if (!this.audioContext) return;

    this.notesInQueue.push({ note: beatNumber, time });

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const maxBeatsVal = this.maxBeats();

    const isWholeNote = beatNumber % maxBeatsVal === 0;
    const isHalfNote = beatNumber % 24 === 0;
    const isQuarterNote = beatNumber % 12 === 0;
    const isEighthNote = beatNumber % 6 === 0;
    const isTripletNote = beatNumber % 4 === 0;
    const isSixteenthNote = beatNumber % 3 === 0;

    if (isWholeNote) {
      if (this.options.accentVolume > 0.25) {
        osc.frequency.value = 880.0;
        gainNode.gain.value = this.calcVolume(this.options.accentVolume);
      } else {
        osc.frequency.value = 440.0;
        gainNode.gain.value = this.calcVolume(this.options.wholeVolume);
      }
      this.options.onPlayedNote({ isWholeNote: true });
    } else if (isHalfNote) {
      osc.frequency.value = 440.0;
      gainNode.gain.value = this.calcVolume(this.options.halfVolume);
      this.options.onPlayedNote({ isHalfNote: true });
    } else if (isQuarterNote) {
      osc.frequency.value = 440.0;
      gainNode.gain.value = this.calcVolume(this.options.quarterVolume);
      this.options.onPlayedNote({ isQuarterNote: true });
    } else if (isEighthNote) {
      osc.frequency.value = 440.0;
      gainNode.gain.value = this.calcVolume(this.options.eighthVolume);
      this.options.onPlayedNote({ isEighthNote: true });
    } else if (isTripletNote) {
      osc.frequency.value = 440.0;
      gainNode.gain.value = this.calcVolume(this.options.tripletVolume);
      this.options.onPlayedNote({ isTripletNote: true });
    } else if (isSixteenthNote) {
      osc.frequency.value = 300.0;
      gainNode.gain.value = this.calcVolume(this.options.sixteenthVolume);
      this.options.onPlayedNote({ isSixteenthNote: true });
    } else {
      gainNode.gain.value = 0;
    }

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  private scheduler = (): void => {
    if (!this.audioContext) return;

    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.currentTwelveletNote, this.nextNoteTime);
      this.nextTwelvelet();
    }
  };

  /**
   * Start the metronome
   */
  start(): void {
    if (this.isPlaying || !this.audioContext) return;

    this.currentTwelveletNote = 0;
    this.nextNoteTime = this.audioContext.currentTime;
    this.notesInQueue = [];

    this.isPlaying = true;
    this.worker?.postMessage({ type: "start" });
  }

  /**
   * Stop the metronome
   */
  stop(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.worker?.postMessage({ type: "stop" });
  }

  /**
   * Get whether the metronome is playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Clean up the worker
   */
  dispose(): void {
    this.worker?.terminate();
    this.worker = null;
  }
}
