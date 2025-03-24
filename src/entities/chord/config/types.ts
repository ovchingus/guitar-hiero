/**
 * A type for a chord
 */
export type Chord = {
  /**
   * The unique identifier of the chord
   */
  id: string;
  /**
   * The name of the chord, e.g. "E"
   */
  name: string;
  /**
   * The full name of the chord, e.g. "E Major in E form"
   * Also may be used as unique identifier
   */
  fullName: string;
  /**
   * The diagram url of the chord
   */
  diagram: string;
  /**
   * The root of the chord, e.g. "E"
   */
  root: string;
  /**
   * The type of the chord, e.g. "Major"
   */
  type: string;
  /**
   * The form of the chord, e.g. "E"
   */
  form: string;
};
