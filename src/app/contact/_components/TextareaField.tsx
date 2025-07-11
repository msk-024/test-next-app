import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaFieldProps {
  label: string;
  name: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  error,
  register,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-bold mb-1">
      {label}
    </label>
    <textarea
      id={name}
      {...register}
      className="w-full p-2 border rounded text-black"
      rows={6}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
