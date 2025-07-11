import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  error,
  register,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-bold mb-1">
      {label}
    </label>
    <input
      id={name}
      type={type}
      {...register}
      className="w-full p-2 border rounded text-black"
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
