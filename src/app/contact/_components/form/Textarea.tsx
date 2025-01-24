import React from "react";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      id={props.id}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)} // 修正
      rows={8}
      className="w-full border border-gray-300 rounded-lg p-4"
    />
  );
};
