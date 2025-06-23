import React from "react";
import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Header } from "@/app/_components/Header";

export const metadata: Metadata = {
  title: "Next-Blog",
  description: "Next.jsで作ったブログです。",
};

export default function RootLayout({
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
