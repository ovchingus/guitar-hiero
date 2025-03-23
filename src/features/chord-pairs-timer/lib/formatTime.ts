/**
 * Formats the time in seconds to a string of minutes and seconds
 * @example
 * formatTime(60) // "1:00"
 * formatTime(30) // "0:30"
 */
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
