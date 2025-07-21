"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Post } from "@/app/_types/AdminPost";
import { PageTitle } from "@/app/_components/PageTitle";
import { PostForm } from "../_components/PostForm";
import { FormButton } from "../_components/FormButton";
import { DeleteConfirmModal } from "../_components/DeleteConfirmModal";
import { useCategories } from "@/hooks/useCategories";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PostEditPage({ params }: Props) {
  const router = useRouter();
  const { id: postId } = use(params);
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRes = await fetch(`/api/admin/posts/${postId}`);
        if (!postRes.ok) throw new Error("投稿データの取得に失敗しました。");
        const postData = await postRes.json();

        setPost(postData.post);
        setTitle(postData.post.title);
        setContent(postData.post.content);
        setThumbnailUrl(postData.post.thumbnailUrl || "");

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

    fetchPost();
  }, [postId]);

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleUpdate = async () => {
    if (!title.trim()) return setErrorMessage("タイトルを入力してください。");
    if (!content.trim()) return setErrorMessage("本文を入力してください。");

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl,
          categories: selectedCategoryIds.map((id) => ({ id })),
        }),
      });
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
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      });
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

  if ((loading || catLoading) && !post) {
    return <p className="p-6">読み込み中...</p>;
  }

  if (!post || catError) {
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

      <FormButton
        label="削除"
        onClick={() => setDeleteConfirmOpen(true)}
        disabled={loading}
        color="red"
        className="mt-4"
      />

      {deleteConfirmOpen && (
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
