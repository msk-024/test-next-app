import React from "react";

interface LabelProps {
  text: string;
  htmlFor: string;
}

export const Label: React.FC<LabelProps> = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="w-[240px]">
      {props.text}
    </label>
  );
};
