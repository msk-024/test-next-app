"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "../_components/PostForm";
import { PageTitle } from "@/app/_components/PageTitle";
import { useCategories } from "@/hooks/useCategories";

export default function NewPostsPage() {
  const router = useRouter();
  const { categories, loading: catLoading, error: catError } = useCategories();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!title.trim()) return setErrorMessage("タイトルを入力してください。");
    if (!content.trim()) return setErrorMessage("本文を入力してください。");
    if (selectedCategoryIds.length === 0)
      return setErrorMessage("カテゴリを1つ以上選択してください。");

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl,
          categories: selectedCategoryIds.map((id) => ({ id })),
        }),
      });

      if (!res.ok) throw new Error("投稿の作成に失敗しました。");

      alert("新規投稿を作成しました！");
      router.push("/admin/posts");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (catLoading) return <p className="p-6">カテゴリ読み込み中...</p>;
  if (catError)
    return <p className="p-6 text-red-500">カテゴリ取得に失敗しました</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageTitle ttl="新規投稿" />
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        toggleCategory={toggleCategory}
        onSubmit={handleCreate}
        loading={loading}
        errorMessage={errorMessage}
        submitLabel="作成する"
      />
    </div>
  );
}
