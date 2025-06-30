import { Post, Category } from "@/app/_types/AdminPost";
import Link from "next/link";

interface CategoryPostProps {
  category: Category;
  categoryPosts: Map<number, Post[]>;
}

export const CategoryPost: React.FC<CategoryPostProps> = ({
  category,
  categoryPosts,
}) => {
  const posts = categoryPosts.get(category.id) || [];
  return (
    <div className="mb-6 border p-4 rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{category.name}</h2>
        <div className="flex gap-2">
          <Link href={`/admin/categories/${category.id}`}>
            <button className="px-2 py-1 bg-yellow-500 text-white rounded">
              編集
            </button>
          </Link>
          <button
            onClick={async () => {
              const confirmed = confirm("本当に削除しますか？");
              if (!confirmed) return;
              const res = await fetch(`/api/categories/${category.id}`, {
                method: "DELETE",
              });
              if (res.ok) {
                alert("削除しました");
                window.location.reload(); // または状態更新で再取得
              } else {
                alert("削除に失敗しました");
              }
            }}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            削除
          </button>
        </div>
      </div>

      {/* 記事表示（既存） */}
      <div className="mt-4">
        {posts.map((post) => (
          <div key={post.id}>{/* ... */}</div>
        ))}
      </div>
    </div>
  );
};
