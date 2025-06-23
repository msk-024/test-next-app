"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  createdAt: string;
  postCategories: {
    category: Category;
  }[];
}

const POSTS_PER_PAGE = 10;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);

  // APIから投稿一覧をページ単位で取得
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts?page=${page}&limit=${POSTS_PER_PAGE}`
      );
      if (!res.ok) throw new Error("投稿データの取得に失敗しました。");
      const data = await res.json();
      setPosts(data.posts);
      setTotalPosts(data.total);
    } catch (error) {
      console.error(error);
      alert("投稿一覧の読み込みに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">投稿一覧</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b">タイトル</th>
                <th className="text-left px-4 py-2 border-b">投稿日</th>
                <th className="text-left px-4 py-2 border-b">カテゴリ</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    投稿がありません
                  </td>
                </tr>
              )}
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3 border-b">{post.title}</td>
                  <td className="px-4 py-3 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {post.postCategories
                      .map((pc) => pc.category.name)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav className="flex justify-center mt-6 space-x-2">
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                前へ
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                次へ
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
