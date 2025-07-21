// 管理者ページ、認証チェック有り
"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminButtonGroups } from "./_components/AdminButtonGroups";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // ログアウト後トップページに戻す
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>読み込み中...</p>;
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      <p className="font-bold mb-4">ようこそ、{session?.user?.email} さん</p>
      <AdminButtonGroups />
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ログアウト
      </button>
    </div>
  );
}
