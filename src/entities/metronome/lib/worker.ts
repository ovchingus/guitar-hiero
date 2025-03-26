import { MetronomeWorkerInputMessage } from "../config/types";

let timerId: NodeJS.Timeout | null = null;
let interval = 100;

/**
 * I use worker to increase accuracy of the metronome
 * because the main thread is busy with other things
 * and it's not accurate enough
 */
self.onmessage = function (e: MessageEvent<MetronomeWorkerInputMessage>) {
  if (e.data.type === "start") {
    timerId = setInterval(function () {
      postMessage({ type: "tick" });
    }, interval);
    return;
  }

  if (e.data.type === "stop") {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    return;
  }

  if (e.data.type === "interval") {
    interval = e.data.interval;
    if (timerId) {
      clearInterval(timerId);
      timerId = setInterval(function () {
        postMessage({ type: "tick" });
      }, interval);
    }
  }
};

// Send initial message to let the main thread know we're ready
postMessage("metronome worker initialized");
