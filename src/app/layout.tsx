import React from "react";
import type { Metadata } from "next";
import "@/src/app/_styles/globals.css";
import Link from "next/link";

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
        <header className="bg-slate-700 text-white">
          <div className="container flex mx-auto p-5 text-xl">
            <Link href="/" className="font-medium ml-3">
              ブログ
            </Link>
            <Link href="/contact" className="font-medium ml-auto text-base">
              お問い合わせ
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
