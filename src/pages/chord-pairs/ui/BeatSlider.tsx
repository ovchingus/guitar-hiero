import { useCallback } from "react";

export default function BeatSlider({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(value);
  }, [onChange]);

  return (
    <div className="mb-4">
      <label
        htmlFor="speed-slider"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Speed: <span className="font-mono">{value} BPM</span>
      </label>
      <input
        type="range"
        id="speed-slider"
        step="1"
        min={min}
        max={max}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        value={value}
        onChange={handleChange}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Slow</span>
        <span>Fast</span>
      </div>
    </div>
  );
}
