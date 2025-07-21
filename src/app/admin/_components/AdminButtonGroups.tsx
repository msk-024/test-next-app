// 管理者ページ用ボタン
import Link from "next/link";

export const AdminButtonGroups: React.FC = () => {
  return (
    <div className="pt-5 w-1/5 px-5 flex flex-col gap-4">
      <ul className="space-y-2 mb-6">
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
};
