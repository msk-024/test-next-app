import React from "react";

interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)} // 修正
      className="border border-gray-300 rounded-lg p-4 w-full"
    />
  );
};
