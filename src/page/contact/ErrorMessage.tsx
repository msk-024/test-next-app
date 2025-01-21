import React from "react";

interface ErrorProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorProps> = (props) => {
  if (!props.message) return null;

  return <p className="text-sm text-red-600">{props.message}</p>;
};
