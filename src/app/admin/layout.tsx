// 管理者ページ
import React from "react";
import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Header } from "@/app/_components/Header";

export const metadata: Metadata = {
  title: "Admin | Next-Blog",
  description: "管理者用ページ",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
