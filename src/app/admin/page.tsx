// 管理者ページ、認証チェック有り
"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

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
      <ul className="space-y-2">
        <li>
          <Link href="/admin/posts" className="text-blue-600 hover:underline">
            投稿一覧
          </Link>
        </li>
        <li>
          <Link
            href="/admin/posts/new"
            className="text-blue-600 hover:underline"
          >
            新規投稿
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className="text-blue-600 hover:underline"
          >
            カテゴリ管理
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ログアウト
      </button>
    </div>
  );
}
