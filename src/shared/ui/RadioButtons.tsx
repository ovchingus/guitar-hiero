interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioButtonsProps {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  orientation?: "vertical" | "horizontal";
}

export default function RadioButtons({
  options,
  name,
  value,
  onChange,
  label,
  orientation = "horizontal"
}: RadioButtonsProps) {
  const containerStyles = orientation === "vertical" 
    ? "flex flex-col gap-3"
    : "flex items-center gap-4";

  return (
    <div>
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </div>
      )}
      <div className={containerStyles}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className={`ml-2 text-sm ${option.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
