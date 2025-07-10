import type { Metadata } from "next";
import { SessionWrapper } from "@/app/_components/SessionWrap";
import { Header } from "@/app/_components/Header";
import "@/app/_styles/globals.css";

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
        <SessionWrapper>
          <Header />
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
