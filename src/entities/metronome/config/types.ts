/**
 * The message type that the main thread can send to the worker
 */
export type MetronomeWorkerInputMessage =
  | {
      type: "start";
    }
  | {
      type: "stop";
    }
  | {
      type: "interval";
      interval: number;
    };

/**
 * The message type that the worker can send to the main thread
 */
export type MetronomeWorkerOutputMessage = {
  type: "tick";
};
