// 管理者ページ
import React from "react";
import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Header } from "@/app/_components/Header";

export const metadata: Metadata = {
  title: "管理画面 | Next-Blog",
  description: "ブログの管理者用ページです",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
