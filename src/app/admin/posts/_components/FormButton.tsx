"use client";

import React from "react";

interface FormButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color?: "blue" | "green" | "red";
  className?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  label,
  onClick,
  disabled = false,
  color = "blue",
  className = "",
}) => {
  const baseClass =
    "px-6 py-2 rounded text-white disabled:opacity-50 transition";
  const colorClass =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : color === "green"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-600 hover:bg-red-700";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${colorClass} ${className}`}
    >
      {label}
    </button>
  );
};
