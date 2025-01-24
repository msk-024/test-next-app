import React from "react";
interface PageTitleProps {
  ttl: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ ttl }) => {
  return <h2 className="text-2xl my-8">{ttl}</h2>;
};
