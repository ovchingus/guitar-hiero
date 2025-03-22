import { formatTime } from "../lib/formatTime";

export default function CountdownTimer({ time }: { time: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 lg:mb-0">
      <h2 className="text-xl font-semibold mb-1">Countdown</h2>
      <div className="text-4xl font-mono bg-gray-100 p-3 rounded-lg text-center">
        {formatTime(time)}
      </div>
    </div>
  );
}
