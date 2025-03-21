"use client";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

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
