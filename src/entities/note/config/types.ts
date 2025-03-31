import { TWELVELET } from "./constants";

/**
 * The value of a note in beats.
 */
export enum NoteValue {
  Whole = TWELVELET * 4,      // 4 beats (12 twelvelets per beat * 4)
  Half = TWELVELET * 2,       // 2 beats
  Quarter = TWELVELET,        // 1 beat
  Eighth = TWELVELET / 2,     // 1/2 beat
  Triplet = TWELVELET / 3,    // 1/3 beat
  Sixteenth = TWELVELET / 4,  // 1/4 beat
}
