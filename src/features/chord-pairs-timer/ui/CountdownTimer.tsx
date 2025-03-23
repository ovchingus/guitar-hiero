import { formatTime } from "../lib/formatTime";

export default function CountdownTimer({ time }: { time: number }) {
  return (
    <div className="mb-4 lg:mb-0">
      <h2 className="text-lg font-bold mb-1">Countdown</h2>
      <div className="text-4xl font-mono bg-gray-100 p-3 rounded-lg text-center">
        {formatTime(time)}
      </div>
    </div>
  );
}
