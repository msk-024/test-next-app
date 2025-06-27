// 管理者ページ
import Link from "next/link";

export default function AdminPage() {
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
    </div>
  );
}
