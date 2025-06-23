"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { category: Category }[];
}

interface Props {
  params: { id: string };
}

export default function PostEditPage({ params }: Props) {
  const router = useRouter();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 投稿とカテゴリ一覧を取得する関数
  const fetchPostAndCategories = async () => {
    setLoading(true);
    try {
      // 投稿データ取得
      const postRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${postId}`
      );
      if (!postRes.ok) throw new Error("投稿データの取得に失敗しました。");
      const postData = await postRes.json();

      // カテゴリ一覧取得
      const categoriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/categories`
      );
      if (!categoriesRes.ok)
        throw new Error("カテゴリ一覧の取得に失敗しました。");
      const categoriesData = await categoriesRes.json();

      setPost(postData.posts[0]);
      setTitle(postData.posts[0].title);
      setContent(postData.posts[0].content);
      setThumbnailUrl(postData.posts[0].thumbnailUrl || "");
      setCategories(categoriesData.categories);

      const selectedIds = postData.posts[0].postCategories.map(
        (pc: { category: Category }) => pc.category.id
      );
      setSelectedCategoryIds(selectedIds);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndCategories();
  }, [postId]);

  // カテゴリ選択の切り替え
  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((c) => c !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  // 投稿更新処理
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${postId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            thumbnailUrl,
            categories: selectedCategoryIds.map((id) => ({ id })),
          }),
        }
      );
      if (!res.ok) throw new Error("更新に失敗しました。");
      alert("投稿を更新しました。");
      router.push("/admin/posts");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 投稿削除処理
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("削除に失敗しました。");
      alert("投稿を削除しました。");
      router.push("/admin/posts");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  if (loading && !post) {
    return <p className="p-6">読み込み中...</p>;
  }

  if (!post) {
    return <p className="p-6">投稿が見つかりません。</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">投稿編集</h1>

      <label className="block mb-2 font-semibold">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-semibold">本文</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-semibold">サムネイルURL</label>
      <input
        type="text"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-semibold">カテゴリ</label>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggleCategory(cat.id)}
            className={`px-3 py-1 rounded border ${
              selectedCategoryIds.includes(cat.id)
                ? "bg-blue-500 text-white border-blue-500"
                : "hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          保存
        </button>
        <button
          onClick={() => setDeleteConfirmOpen(true)}
          disabled={loading}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          削除
        </button>
      </div>

      {/* 削除確認モーダル */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <p className="mb-4">本当にこの投稿を削除しますか？</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
