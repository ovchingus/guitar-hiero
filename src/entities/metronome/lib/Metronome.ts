import {
  MetronomeWorkerInputMessage,
  MetronomeWorkerOutputMessage,
} from "../config/types";

export class Metronome {
  private worker: Worker | null = null;

  constructor() {
    this.worker = new Worker(new URL("./worker.ts", import.meta.url));
  }

  /**
   * Set the callback that will be called on each tick
   */
  onTick(callback: () => void): void {
    if (!this.worker) return;

    this.worker.onmessage = (
      event: MessageEvent<MetronomeWorkerOutputMessage>
    ) => {
      if (event.data.type === "tick") {
        callback();
      }
    };
  }

  /**
   * Set the interval between ticks in milliseconds
   */
  addInterval(interval: number): void {
    if (!this.worker) return;

    const message: MetronomeWorkerInputMessage = {
      type: "interval",
      interval,
    };
    this.worker.postMessage(message);
  }

  /**
   * Start the metronome worker
   */
  start(): void {
    if (!this.worker) return;

    const message: MetronomeWorkerInputMessage = { type: "start" };
    this.worker.postMessage(message);
  }

  /**
   * Stop the metronome worker
   */
  stop(): void {
    if (!this.worker) return;

    const message: MetronomeWorkerInputMessage = { type: "stop" };
    this.worker.postMessage(message);
  }

  /**
   * Clean up the worker
   */
  dispose(): void {
    this.worker?.terminate();
    this.worker = null;
  }
}
