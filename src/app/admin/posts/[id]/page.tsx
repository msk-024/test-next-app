"use client";

import { use } from "react"; // ←Next.js15以降
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Post } from "@/app/_types/AdminPost";
import { PageTitle } from "@/app/_components/PageTitle";
import { PostForm } from "../_components/PostForm";
import { FormButton } from "../_components/FormButton";
import { DeleteConfirmModal } from "../_components/DeleteConfirmModal";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PostEditPage({ params }: Props) {
  const router = useRouter();
  const { id: postId } = use(params);

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchPostAndCategories = async () => {
      setLoading(true);
      try {
        const postRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${postId}`
        );
        if (!postRes.ok) throw new Error("投稿データの取得に失敗しました。");
        const postData = await postRes.json();

        const categoriesRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/categories`
        );
        if (!categoriesRes.ok)
          throw new Error("カテゴリ一覧の取得に失敗しました。");
        const categoriesData = await categoriesRes.json();

        setPost(postData.post);
        setTitle(postData.post.title);
        setContent(postData.post.content);
        setThumbnailUrl(postData.post.thumbnailUrl || "");
        setCategories(categoriesData.categories);

        const selectedIds = postData.post.postCategories.map(
          (pc: { category: Category }) => pc.category.id
        );
        setSelectedCategoryIds(selectedIds);
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndCategories();
  }, [postId]);

  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((c) => c !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      setErrorMessage("タイトルを入力してください。");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("本文を入力してください。");
      return;
    }

    setLoading(true);
    setErrorMessage("");

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
    <div className="max-w-4xl mx-auto p-6">
      <PageTitle ttl="投稿編集" />
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
        onSubmit={handleUpdate}
        loading={loading}
        errorMessage={errorMessage}
      />
      {/* 削除ボタン（クリックでモーダル開く） */}
      <FormButton
        label="削除"
        onClick={() => setDeleteConfirmOpen(true)}
        disabled={loading}
        color="red"
        className="mt-4"
      />
      {deleteConfirmOpen && (
        // モーダル
        <DeleteConfirmModal
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
}
