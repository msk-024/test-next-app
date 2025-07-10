// 管理者ページ用一覧
import React from "react";
import Link from "next/link";
import { Post } from "@/app/_types/AdminPost";

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const handleDelete = async () => {
    const ok = confirm("本当に削除しますか？");
    if (!ok) return;

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("削除しました");
      window.location.reload(); // 状態管理で再取得でもOK
    } else {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="border border-black mb-4 w-4/5 mx-auto">
      <div className="p-5">
        <div className="flex justify-between">
          <p>{post.createdAt.slice(0, 10)}</p>
          <div className="flex">
            {post.postCategories?.map((postCategory, i) => (
              <p
                key={i}
                className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
              >
                {postCategory.category.name}
              </p>
            ))}
          </div>
        </div>
        <Link href={`/article/${post.id}`}>
          <h2 className="font-medium text-2xl mb-4 hover:underline cursor-pointer">
            {post.title}
          </h2>
        </Link>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="line-clamp-2"
        />
        <div className="flex gap-2 mt-4">
          <Link href={`/admin/posts/${post.id}`}>
            <button className="bg-yellow-400 text-white px-3 py-1 rounded">
              編集
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};
