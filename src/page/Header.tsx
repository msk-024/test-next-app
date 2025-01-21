import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-700 text-white w">
      <div className="container flex mx-auto p-5 text-xl">
        <Link to="/" className="font-medium ml-3">
          ブログ
        </Link>

        <Link to="/contact" className="font-medium ml-auto text-base">
          お問い合わせ
        </Link>
      </div>
      <Outlet />
    </header>
  );
};
