"use client";

import React from "react";

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

// TODO: Make fancy feature rich select component
export default function Select({
  options,
  value,
  onChange,
  label,
  disabled = false,
  className = "",
  size = "md",
}: SelectProps) {
  const baseStyles =
    "w-full rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-50"
    : "hover:border-gray-400";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
