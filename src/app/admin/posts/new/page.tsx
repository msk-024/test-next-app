"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/app/_types/AdminPost";
import { PostForm } from "../_components/PostForm";
import { PageTitle } from "@/app/_components/PageTitle";

export default function NewPostsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // カテゴリー一覧の取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `/api/admin/categories`
        );
        if (!res.ok) throw new Error("カテゴリー一覧の取得に失敗しました。");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("カテゴリー一覧の取得に失敗しました。", error);
        alert("投稿一覧の読み込みに失敗しました。");
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((c) => c !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleCreate = async () => {
    // 入力チェック（バリデーション）
    if (!title.trim()) {
      setErrorMessage("タイトルを入力してください。");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("本文を入力してください。");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      setErrorMessage("カテゴリを1つ以上選択してください。");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // エラーリセット

    try {
      const res = await fetch(
        `/api/admin/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            thumbnailUrl,
            categories: selectedCategoryIds.map((id) => ({ id })),
          }),
        }
      );

      if (!res.ok) throw new Error("投稿の作成に失敗しました。");
      alert("新規投稿を作成しました！");
      router.push("/admin/posts");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
      />
    </div>
  );
}
